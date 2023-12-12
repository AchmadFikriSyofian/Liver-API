const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient ();
const {getPagination} = require ('../libs/pagination');
const {search, filter, getByType} = require ('../repositories/course');

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

    getCoursePopuler: async (req, res, next) => {
        try {
            let { id } = req.params;
    
            // Get the category
            let category = await prisma.categories.findUnique({
                where: { id: Number(id) },
            });
            if (!category) {
                return res.status(404).json({
                    status: false,
                    message: 'Category not found',
                    err: null,
                    data: null,
                });
            }
    
            // Get the associated courses
            let topCourses = await prisma.categoriesOnCourses.findMany({
                where: { category_id: Number(id) },
                take: 3,
                orderBy: {
                    course: {
                        rating: 'desc'
                    }
                },
                include: {
                    category: {
                        select: {
                            name: true
                        }
                    },
                    course: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            price: true,
                            level: true,
                            rating: true,
                            total_lesson: true,
                            total_duration: true,
                            mentor: {
                                select: {
                                    mentor: true
                                }
                            }
                        }
                    }
                }
            });
    
            res.status(200).json({
                status: true,
                message: 'Show Category Detail',
                err: null,
                data: {
                    category,
                    topCourses
                },
            });
        } catch (err) {
            next(err);
        }
    }, 

    // Menampilkan Course Detail
    getDetailCourse: async (req, res, next) => {
        try {
            let { id } = req.params;
            let course = await prisma.courses.findUnique({
                where: { id: Number(id) },
                include: {
                    category: {
                        select: {
                            category: true
                        }
                    },
                    chapter: {
                        select: {
                            name: true,
                            lesson: {
                                select: {
                                    name: true,
                                    video: true,
                                    desc: true,
                                    duration: true
                                },
                            },
                        },
                    },
                    mentor: {
                        select: {
                            mentor: true
                        },
                    },
                },
            });

            if (!course) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request!',
                    data: `Course with id ${id} doesn\'t exist!`
                });
            }

            let response = {
                data: {
                    category: course.category,
                    title: course.name,
                    mentor: course.mentor,
                    level: course.level,
                    modul: course.total_lesson,
                    duration: course.total_duration,
                    rating: course.rating,
                    desc: course.desc,
                    intended_for: course.intended_for,
                    chapter: course.chapter
                }
            }

            res.status(200).json({
                status: true,
                message: 'OK!',
                data: response
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
    },

    filter: async (req, res, next) => {
        try {
            const result = await filter (req);

            res.status (200).json ({
                data: result,
            });
        } catch (error) {
            next (error);
        }
    },

    getByType: async (req, res, next) => {
        try {
            const {result, pagination} = await getByType (req);

            res.status (200).json ({
            data: {result, pagination},
            });
        } catch (error) {
            next (error);
        }
    },

    getPremiumCourse: async (req, res, next) => {
        try {
            const { categoryId, level } = req.query;
            let course = await prisma.categoriesOnCourses.findMany({
                where: {
                    category_id: Number(categoryId),
                    course: {
                        level: level,
                        type: 'isPremium'
                    }
                },
                include: {
                    course:{ 
                        select: {
                            name: true,
                            price: true,
                            image: true,
                            rating: true,
                            total_lesson: true,
                            total_duration: true
                        }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    }   
                }
            });

            // let filteredCourse = course.filter((course) => course.course !== null );
            
            if (course.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Data is not found',
                    err: 'Not Found',
                    data: null,
                })
            }
            
            res.status(200).json({
                status: true,
                message: 'OK!',
                err: null,
                data: course
            });
        } catch (err) {
            next(err);
        }
    },

    getFreeCourse: async (req, res, next) => {
        try {
            const { categoryId, level } = req.query;
            const course = await prisma.categoriesOnCourses.findMany({
                where: {
                    category_id: Number(categoryId),
                    course: {
                        level: level,
                        type: 'isFree',
                    }
                },
                include: {
                    course:{ 
                        select: {
                            name: true,
                            price: true,
                            image: true,
                            rating: true,
                            total_lesson: true,
                            total_duration: true
                        }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    }   
                }
            });

            let filteredCourse = course.filter((course) => course.course !== null );
            
            if (filteredCourse.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Data is not found',
                    err: 'Not Found',
                    data: null,
                })
            }
            
            res.status(200).json({
                status: true,
                message: 'OK!',
                err: null,
                data: filteredCourse
            });
        } catch (err) {
            next(err);
        }
    },
};
