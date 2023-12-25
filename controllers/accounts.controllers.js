const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const imagekit = require('../libs/imagekit');
const path = require('path');


module.exports = {
    updateProfile: async(req, res, next) => {
        try{
            let {id} = req.user;
            let {name, no_hp, country, city} = req.body;

            const userExist = await prisma.users.findUnique({where: {id: Number(id)}});
            if(!userExist){
                return res.status(404).json({
                    status: false,
                    message: 'Not Found',
                    err: 'User ID is not Exist',
                    data: null
                });
            }

            let updateFields = {
                name,
                email: userExist.email,
                password: userExist.password,
                no_hp,
                country,
                city
            }

            if(req.file){
                let strFile = req.file.buffer.toString('base64');
    
                let {url} = await imagekit.upload({
                    fileName: Date.now() + path.extname(req.file.originalname),
                    file: strFile
                });
                updateFields.foto_profile = url;
            }

            let updateOperation = await prisma.users.upsert({
                where: {id: Number(id)},
                update: updateFields,
                create: {id: Number(id), ...updateFields}
            });

            return res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: {updateOperation}
            });

        } catch(err){
            next(err);
        }
    },

    updatePassword: async (req, res, next) => {
        try {
            let {id} = req.user;
            let {password, newPassword} = req.body;

            const userExist = await prisma.users.findUnique({where: {id: Number(id)}});
            if(!userExist) {
                return res.status(404).json({
                    status: false,
                    message: 'Not Found',
                    err: 'User id is not Exist',
                    data: null
                });
            }

            
            const isPasswordValid = await bcrypt.compare(password, userExist.password);
            if(!isPasswordValid){
                return res.status(401).json({
                    status: false,
                    message: 'Unauthorized',
                    err: 'Current Password is incorrect!',
                    data: null
                })
            }
            
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
            if(!passwordRegex.test(newPassword)) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Password must contain at least one digit, special character, lowercase, uppercase, and at least 8 character long.',
                    data: null
                });
            }

            const encryptedNewPassword = await bcrypt.hash(newPassword, 10);
            const updatePassword = await prisma.users.update({
                where: {id: Number(id)},
                data: {
                    password: encryptedNewPassword
                }
            });

            res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: updatePassword
            })
        } catch(err){
            next(err);
        }
    },

    payment_history: async (req, res, next) => {
        try{
            let {id} = req.user;

            const userExist = await prisma.users.findUnique({where: {id: Number(id)}});
            if (!userExist){
                return res.status(404).json({
                    status: false,
                    message: 'Not Found',
                    err: 'User is not Exist',
                    data: null
                })
            }
            
            const enrollment = await prisma.enrollments.findMany({where: {user_id: Number(userExist.id)}});
            if(!enrollment){
                return res.status(404).json({
                    status: false,
                    message: 'Not Found',
                    err: 'User id is not Exist',
                    data: null
                });
            }

            res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: {enrollment}
            })
        }catch(err){
            next(err);
        }
    },

    notification: async (req, res, next) => {
        try {
            let {id} = req.user;

            const userExist = await prisma.users.findUnique({ where: {id: Number(id)}});
            if(!userExist){
                return res.status(404).json({
                    status: false,
                    message: 'Not Found',
                    err: 'User Not Found',
                    data: null
                });
            }
            
            const notification = await prisma.notifications.findMany({
                select: {
                    id: true,
                    title: true,
                    body: true,
                    createAt: true
                }
            });

            res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: notification
            })
        }catch(err){
            next(err);
        }
    }
};