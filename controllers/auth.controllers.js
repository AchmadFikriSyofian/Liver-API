const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {JWT_SECRET_KEY} = process.env;
const {generateOTP} = require('../utils/otp');
const {sendOTPByEmail} = require('../utils/nodemailer');

module.exports = {
    register: async (req, res, next) => {
        try {
            const {name, email, no_hp, password} = req.body;

            const userExist = await prisma.users.findUnique({where: {email}});
            if(userExist){
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Email has already been used',
                    data: null
                });
            }

            // generate OTP
            const otpCode = generateOTP();

            // Create user with encrypted password and OTP
            const encryptedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.users.create({
                data: {
                    name,
                    email,
                    no_hp,
                    password: encryptedPassword,
                    otp: {
                        create: {
                            kode_otp: otpCode,
                            expiredAt: new Date(Date.now() + 0*5*1000)
                        }
                    }
                },
                include: {
                    otp: true
                }
            });


            // Create OTP
            const otp = await prisma.otp.create({
                data: {
                    kode_otp: otpCode,
                    expiredAt: new Date(Date.now() + 0*5*1000), // Set expiration to 5 minutes from now
                    user: {
                        connect: {id: newUser.id} // Use User Id who just created
                    }
                }
            });

            // Send OTP to User Email
            await sendOTPByEmail(email, otp);
            return res.status(200).json({
                status: true,
                message: 'User registered successfully, OTP sent to your Email',
                err: null,
                data: {newUser}
            });

        } catch(err){
            next(err);
        }
    },
    
    verifyEmail: async (req, res, next) =>{
        try{
            const {email, otp} = req.body;
            
            const user = await prisma.users.findUnique({
                where: {email},
                include: {otp: true}
            });
            if(!user || !user.otp){
                return res.status(404).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Invalid OTP',
                    data: null
                });
            }

            const isVerified = await prisma.users.update({
                where: {email},
                data: {is_active:true}
            });
            
            return res.status(200).json({
                status: true,
                message: 'OTP Successfully',
                err: null,
                data: {user}
            })
        } catch(err){
            next(err);
        }
    },

    getNewOTP: async (req, res, next) =>{
        try{
            const {email} = req.query;

            const user = await prisma.users.findUnique({
                where: {email},
                include: {otp: true}
            });

            if(!user){
                return res.status(404).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'User Not Found',
                    data: null
                });
            }

            // Generate New OTP
            const newOtpCode = generateOTP();

            // Update existing OTP with new code and reset Expiration
            await prisma.otp.update({
                where: {id: user.otp.id},
                data: {
                    kode_otp: newOtpCode,
                    expiredAt: new Date(Date.now() + 0*5*1000) // Set Expired to 5 minutes from now
                }
            });

            // Send new OTP to User Email
            await sendOTPByEmail(email, newOtpCode);
            return res.status(200).json({
                status: true,
                message: 'New OTP sent to your Email',
                err: null,
                data: null
            });
        } catch(err){
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            let users = await prisma.users.findUnique({where:{email}});
            if (!users) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'invalid email or password!',
                    data: null
                });
            }

            let isPasswordCorrect = await bcrypt.compare(password, users.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'invalid email or password!',
                    data: null
                });
            }

            let token = jwt.sign({ id: users.id }, JWT_SECRET_KEY);

            return res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: { users, token }
            });
        } catch (err) {
            next(err);

        }
    },
};