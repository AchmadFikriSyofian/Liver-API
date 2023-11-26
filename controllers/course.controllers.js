const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {getPagination} = require('../libs/pagination'); 
const { search, getByCategory } = require('../libs/course');

module.exports = {
    getAllCourse: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);
    
            let courses = await prisma.courses.findMany({
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    category: {
                        select: {
                            category: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                },
            });
    
            const { _count } = await prisma.courses.aggregate({
                _count: { id: true },
            });
    
            let pagination = getPagination(req, _count.id, page, limit);
    
            res.status(200).json({
                status: true,
                message: 'Show All Course',
                err: null,
                data: { pagination, courses },
            });
        } catch (err) {
            next(err);
        }
    },
    
    search: async (req, res, next) =>{
        try{
            const result = await search(req);

            res.status(200).json({
                data: result,
            })
         } catch (err){
            next(err);
         }
    },
    
    getByCategory: async(req, res, next) => {
        try {
            const result = await getByCategory(req);

            res.status(200).json({
                data: result,
            })
        } catch (error) {
            next(error);
        }
    }
}

