const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../libs/pagination');

module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            let {id} = req.params;
            limit = Number(limit);
            page = Number(page);

            let categories = await prisma.categories.findMany({
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    name: true,
                }
            });

            const { _count } = await prisma.categories.aggregate({
                _count: { id: true },
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'Show All Categories',
                err: null,
                data: { pagination, categories },
            });
        } catch (err) {
            next(err);
        }
    },

    getCategoriesDetail: async (req, res, next) => {
        try {
            let {id} = req.params
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            let categories = await prisma.categories.findUnique({
                where: {id: Number(id)},
                skip: (page - 1) * limit,
                take: limit,
                where: {id : Number(id)}, 
                select: {
                    id: true,
                    name: true,
                    course: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                },
            });

            const { _count } = await prisma.categories.aggregate({
                _count: { id: true },
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'Show All Categories',
                err: null,
                data: { pagination, categories },
            });
        } catch (err) {
            next(err);
        }
    },
};
