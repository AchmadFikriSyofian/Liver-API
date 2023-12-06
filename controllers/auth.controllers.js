const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;
const { getHtml, sendEmail } = require('../utils/nodemailer');

module.exports = {
    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await prisma.users.findUnique({ where: { email: email} });

            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: "Bad Request!",
                    data: "No User Found"
                });
            } 

            let link = `http://localhost:3001/api/v1/auth/reset-password/?email=${email}`;
            let html = await getHtml('reset-password.ejs', { name: user.name, link })

            sendEmail(email, html);

            res.status(200).json({
                status: true,
                message: 'OK!',
                err: null,
                data: email
            })
            
        } catch (err) {
            next(err);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { email } = req.query;
            // const decoded = jwt.verify(token, JWT_SECRET_KEY);

            // if (!decoded) {
            //     return res.status(400).json({
            //         status: false,
            //         message: "Token is invalid!",
            //         data: null
            //     });
            // }

            const { password, password_confirmation } = req.body;

            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
            if(!passwordRegex.test(password)) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Password must contain at least one digit, special character, lowercase, uppercase, and at least 8 character long.',
                    data: null
                })
            }

            if (password != password_confirmation) {
                return res.status(400).json({
                    status: false,
                    message: 'Please ensure that password and password confirmation match!',
                    data: null
                });
            }

            const passwordupdated = await prisma.users.update({ 
                where: { email: email },
                data: {
                  password: await bcrypt.hash(password, 10)
                }
            });

            res.status(200).json({
                status: true,
                message: 'OK!',
                err: null,
                data: passwordupdated
            })
        } catch (err) {
            next(err);
        }
    }
};