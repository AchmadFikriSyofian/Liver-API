const {PrismaClient, StatusPembayaran, MetodePembayaran} = require('@prisma/client');
const prisma = new PrismaClient();
const {getPagination} = require ('../libs/pagination');

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
                include: {
                    course: {
                        select: {
                            id: true,
                            chapter: {
                                select: {
                                    name: true,
                                }
                            },
                            category: {
                                select: {
                                    category: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            let response = {
                data: {
                    activeUsers: activeUsers,
                    activeClass: activeClass,
                    premiumClass: premiumClass,
                    id: enrollment.id,
                    kategori: enrollment.category,
                    kelaspremium: enrollment.chapter,
                    statuspembayaran: enrollment.statusPembayaran,
                    metodepembayaran: enrollment.metodePembayaran,
                    tanggalbayar: enrollment.tanggalBayar
                }
            };

            const { _count } = await prisma.courses.aggregate({
                _count: { id: true },
            });
    
            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK!',
                data: { response, pagination}
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

            let course = await prisma.courses.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    type: type,
                    level: level,
                    category: {
                        ...(categoryId ? { category_id: Number(categoryId)}: {}),
                    }
                }, 
                include: {
                    category: {
                        select: {
                            category: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                }
            });

            let response = {
                data: {
                    activeUsers: activeUsers,
                    activeClass: activeClass,
                    premiumClass: premiumClass,
                    id: course.id,
                    kategori: course.category,
                    namakelas: course.name,
                    tipekelas: course.type,
                    level: course.level,
                    harga: course.price
                }
            };

            const { _count } = await prisma.courses.aggregate({
                _count: { id: true },
            });
    
            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK!',
                data: { response, pagination}
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
    }
};