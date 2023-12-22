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
            const {category_ids, name, desc, price, level, type, intended_for, mentor_ids} = req.body;

            // if(!category_ids || !name || !desc || !price || !level || !type || !intended_for || !mentor_ids){
            //     return res.status(400).json({
            //         status: false,
            //         message: 'Bad Request',
            //         err: 'Make sure all column has been adding',
            //         data: null
            //     });
            // }

            // const categoriesExist = await prisma.categories.findFirst({
            //     where: {name: category},
            // });
            // console.log(categoriesExist);

            // const categoryRecord = categoriesExist || await prisma.categories.create({
            //     data: {name: category},
            // });
            // console.log(categoryRecord)

            // const mentorExist = await prisma.mentors.findFirst({
            //     where: {name: mentors},
            // });
            // console.log(mentorExist);

            // const mentorRecord = mentorExist || await prisma.mentors.create({
            //     data: {name: mentors},
            // });
            // console.log(mentorRecord);

            const newCourse = await prisma.courses.create({
                data: {
                    name,
                    desc,
                    price,
                    level,
                    type,
                    intended_for,
                    category: {
                        create: category_ids.map(categoryId => {
                            return {
                                    category: {
                                        connect: {
                                            id: categoryId
                                        }
                                    }
                                }
                        })
                    },
                    mentor: {
                        create: mentor_ids.map(mentorId => {
                            return {
                                    mentor: {
                                        connect: {
                                            id: mentorId
                                        }
                                    }
                                }
                        })
                    }
                }
            });

            return res.status(201).json({
                status: true,
                message: 'Created',
                err: null,
                data: newCourse
            })
        }catch(err){
            next(err);
        }
    }
};