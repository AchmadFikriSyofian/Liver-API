const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;

module.exports = {
    login: async (req, res, next)=>{
        try {
            const {id, password} = req.body;

            let users = await prisma.users.findUnique({where:{id}});
            if (!users || !users.is_admin) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'invalid id or password!',
                    data: null
                });
            }

            // nambahin kondisi login harus true

            let isPasswordCorrect = await bcrypt.compare(password, users.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'invalid id or password!',
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

    addCourse: async (req, res, next) => {
        try{
            console.log(req.body);
            const {name, category, desc, price, level, rating, type, intended_for, total_lesson, total_duration, chapters, mentors} = req.body;

            if(!name || !category || !desc || !price || !level || !rating || !type || !intended_for || !total_lesson || !total_duration || !chapters || !Array.isArray(chapters) || !Array.isArray(mentors)){
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Make sure all column has been adding',
                    data: null
                });
            }

            const newCourse = await prisma.courses.create({
                data: {
                    name,
                    desc,
                    price,
                    level,
                    rating,
                    type,
                    intended_for,
                    total_lesson,
                    total_duration
                }
            })
        }catch(err){
            console.log(err);
        }
    }
};