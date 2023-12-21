const {PrismaClient, StatusPembayaran, MetodePembayaran} = require('@prisma/client');
const prisma = new PrismaClient();
const {getPagination} = require ('../libs/pagination');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;

module.exports = {
    dashboard: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            const activeUsers = await prisma.users.count({ where: { is_active: true }});
            const activeClass = await prisma.courses.count();
            const premiumClass = await prisma.courses.count({ where: { type: 'isPremium' }});
            
            const { categoryId, statusbayar, metodebayar } = req.query;

            let enrollment =  await prisma.enrollments.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    StatusPembayaran: statusbayar,
                    MetodePembayaran: metodebayar,
                    course: {
                        category: {
                            ...(categoryId ? { category_id: Number(categoryId)}: {}),
                        }
                    }
                },
                select: {
                    id: true,
                    course: {
                        select: {
                            category: {
                                select: {
                                    category: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            },
                            name: true
                        }
                    },
                    statusPembayaran: true,
                    metodePembayaran: true,
                    tanggalBayar: true
                }
            });

            const { _count } = await prisma.courses.aggregate({
                _count: { id: true },
            });
    
            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK!',
                data: {  
                    activeUsers: activeUsers,
                    activeClass: activeClass,
                    premiumClass: premiumClass,
                    enrollment, pagination }
            });
            
        } catch (err) {
            next(err);
        }
    },

    kelolaKelas: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            const activeUsers = await prisma.users.count({ where: { is_active: true }});
            const activeClass = await prisma.courses.count();
            const premiumClass = await prisma.courses.count({ where: { type: 'isPremium' }});
            
            const { categoryId, type, level } = req.query;

            let course = await prisma.categoriesOnCourses.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    course: {
                        type: type,
                        level: level,
                    },
                    category: {
                        ...(categoryId? {id: Number(categoryId)} : {}),
                    }
                },
                select: {
                    category: {
                        select: {
                            name: true
                        }
                    },
                    course: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
                            level: true,
                            price: true,
                        }
                    }
                }
            });

            const { _count } = await prisma.courses.aggregate({
                _count: { id: true },
            });
    
            let pagination = getPagination(req, _count.id, limit, page);

            res.status(200).json({
                status: true,
                message: 'OK!',
                data: { 
                    pagination,
                    activeUsers: activeUsers,
                    activeClass: activeClass,
                    premiumClass: premiumClass,
                    course
                }
            });

        } catch (err) {
            next(err);
        }
    },

    deleteCourse: async (req, res, next) => {
        try {
            let { id } = req.params;

            let result = await prisma.courses.delete({
                where: { id : Number(id) }
            });

            res.status(200).json({
                status: true,
                message: 'OK',
                data: result
            });

        } catch (err) {
            next (err);
        }
    },

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

};