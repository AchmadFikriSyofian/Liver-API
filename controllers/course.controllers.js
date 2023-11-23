const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {getPagination} = require('../libs/pagination'); 

module.exports = {
    // Menampilkan Course List
    getAllCourse: async (req, res, next) =>{
        try{
            let {limit = 10, page = 1} = req.query;
            limit = Number(limit);
            page = Number(page);

            let course = await prisma.courses.findMany({
                skip: (page - 1) * limit,
                take: limit
            }); 

            const {_count} = await prisma.courses.aggregate({
                _count: {id: true}
            });

            let pagination = getPagination(req, _count.id, page, limit);
            res.status(200).json({
                status: true,
                message: 'Show All Account',
                err: null,
                data: {pagination, course}
            })
        }catch (err){
            next(err);
        }
    }
}