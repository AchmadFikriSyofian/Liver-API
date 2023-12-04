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
        try{
            let { name, email, no_hp, password} = req.body;

            // Checking Password
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
            if(!passwordRegex.test(password)) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Password must contain at least one digit, special character, lowercase, uppercase, and at least 8 character long.'
                })
            }
            
            let userExist = await prisma.users.findUnique({where: {email}});
            if(userExist){
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'User has been already used',
                    data: null
                });
            }

            let encryptedPassword = await bcrypt.hash(password, 10);
            let user = await prisma.users.create({
                data: {
                    name,
                    email,
                    no_hp,
                    password: encryptedPassword
                }
            });

            // Generate OTP and Save to the user in the database
            let otpValue = generateOTP();
            let expiredTime = new Date();
            expiredTime.setMinutes(expiredTime.getMinutes() + 5); 
            await prisma.otp.create({
                data: {
                    user_id: user.id,
                    kode_otp: otpValue,
                    expiredAt: expiredTime
                }
            });
            
            // Send OTP to user email
            sendOTPByEmail(email, otpValue);

            return res.status(201).json({
                status: true,
                message: 'Created',
                err: null,
                data: {user}
            })
        }catch(err){
            next(err);
        }
    },

    verify: async (req, res, next) => {
        try {
            let {email, otp} = req.body;

            const user = await prisma.users.findUnique({where: {email}});
            if(!user){
                return res.status(404).json({
                    status: false,
                    message: 'Not Found',
                    err: 'User Not Found',
                    data: null
                });
            }

            const otpRecord = await prisma.otp.findFirst({
                where: {
                    user_id: user.id,
                    kode_otp: otp,
                    expiredAt: {
                        gte: new Date().toISOString()
                    }
                }
            });

            if(!otpRecord) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Invalid OTP',
                    data: null
                });
            }

            await prisma.users.update({
                where: {id: user.id},
                data: {is_active: true}
            })

            return res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: {
                    user: user.email,
                    is_active: true
                }
            })
        }catch(err){
            next(err);
        }
    },

    newOTP: async (req, res, next)=>{
        try{
            let {email} = req.body;

            const user = await prisma.users.findUnique({where: {email}});
            if(!user){
                return res.status(404).json({
                    status: false,
                    message: 'Bad request',
                    err: 'User Not Found',
                    data: null
                });
            }

            // Generate New OTP
            let newotpValue = generateOTP();

            const existingOTP = await prisma.otp.findFirst({
                where: {
                    user_id: user.id
                }
            });

            // Update the existing OTP record
            if(existingOTP){
                const expiredTime = new Date();
                expiredTime.setMinutes(expiredTime.getMinutes() + 5);

                await prisma.otp.update({
                    where: {id: existingOTP.id},
                    data: {
                        kode_otp: newotpValue,
                        expiredAt: expiredTime
                    }
                });
            } else {
                return false;
            }


            // Resend the New OTP to user email
            sendOTPByEmail(email, newotpValue);

            return res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: {
                    user: user.email,
                    newOTP: true
                }
            })

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