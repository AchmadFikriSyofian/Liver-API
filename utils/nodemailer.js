const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ejs = require('ejs');
const { GOOGLE_REFRESH_TOKEN, GOOGLE_SENDER_EMAIL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const oauth2Client = new google.auth.OAuth2 ( GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET );

oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

module.exports = {
    sendEmail: async (email, html) => {
        const accesToken = await oauth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: GOOGLE_SENDER_EMAIL,
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: accesToken
            }
        });

        await transport.sendMail({ 
            from: 'livercourse.7@gmail.com',
            to: email,
            subject: 'Reset Password', 
            html 
        });
    },

    getHtml: (fileName, data) => {
        return new Promise((resolve, reject) => {
            const path = `${__dirname}/../views/${fileName}`;

            ejs.renderFile(path, data, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    },

    sendOTPByEmail: async (email, otp) =>{
        try{
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: GOOGLE_SENDER_EMAIL,
                    // pass: GOOGLE_SENDER_PASS,
                    clientId: GOOGLE_CLIENT_ID,
                    clientSecret: GOOGLE_CLIENT_SECRET,
                    refreshToken: GOOGLE_REFRESH_TOKEN
                }
            });

            const info = await transporter.sendMail({
                from: 'livercourse.7@gmail.com',
                to: email,
                subject: 'OTP Verification',
                text: `Your OTP for registration is ${otp}`
            });

            console.log('Message sent: %s', info.messageId);
        } catch(err){
            console.log('Error Sending Email:', err);
        }
    }
};