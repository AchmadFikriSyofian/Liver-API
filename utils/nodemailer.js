const nodemailer = require('nodemailer');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {GOOGLE_REFRESH_TOKEN, GOOGLE_SENDER_EMAIL,GOOGLE_SENDER_PASS, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;

module.exports = {
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