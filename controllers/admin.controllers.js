const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const imagekit = require('../libs/imagekit');
const path = require('path');
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

    addCategory: async (req, res, next) => {
        try {
            let {name, image} = req.body;

            // const categoryExist = await prisma.categories.findUnique({where: {id: Number(id)}});
            // if(categoryExist){
            //     return res.status(400).json({
            //         status: false,
            //         message: 'Bad request',
            //         err: 'Category already Exist',
            //         data: null
            //     });
            // }

            let strFile = req.file.buffer.toString('base64');

            let {url} = await imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile
            });

            let newCategory = await prisma.categories.create({
                data: {
                    name,
                    image: url
                }
            });

            return res.status(201).json({
                status: true,
                message: 'Created',
                err: null,
                data: {newCategory}
            })

        }catch(err){
            next(err);
        }
    },

    addCourse: async (req, res, next) => {
        try{
            const {category_id, name, desc, price, level, type, intended_for, mentor_id} = req.body;

            if(!category_id || !name || !desc || !price || !level || !type || !intended_for || !mentor_id){
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'Make sure all column has been adding',
                    data: null
                });
            }

            // const categoriesExist = await prisma.categories.findFirst({
            //     where: {name: category},
            // });

            // const categoryRecord = categoriesExist || await prisma.categories.create({
            //     data: {name: category},
            // });

            // const mentorExist = await prisma.mentors.findFirst({
            //     where: {name: mentors},
            // });

            // const mentorRecord = mentorExist || await prisma.mentors.create({
            //     data: {name: mentors},
            // });

            const newCourse = await prisma.courses.create({
                data: {
                    name,
                    desc,
                    price,
                    level,
                    type,
                    intended_for,
                    category: {
                        create: [{
                                    category: {
                                        connect: {
                                            id: category_id
                                        }
                                    }
                                }]
                    },
                    mentor: {
                        create: [{
                                    mentor: {
                                        connect: {
                                            id: mentor_id
                                        }
                                    }
                                }]
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