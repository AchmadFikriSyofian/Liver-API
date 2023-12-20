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
            
            let categoryId;
            const categoryExist = await prisma.categories.findUnique({where: {name: category}});
            if(!categoryExist){
                const newCategory = await prisma.categories.create({
                    data: {
                        name: category
                    }
                });
                categoryId = newCategory.id;
            } else {
                categoryId = categoryExist.id;
            }

            const course = await prisma.courses.create({
                data: {
                    name,
                    desc,
                    price,
                    level,
                    rating,
                    type,
                    intended_for,
                    total_lesson,
                    total_duration,
                    categoriesOnCourses: {
                        create: {
                            category: {connect: {id: categoryId}}
                        }
                    },
                    // mentorsOnCourses: {create: {data: mentorsOnCourses}},
                    // chapters: {createMany: {data: chaptersData}},
                }
            });
            const mentorsId = [];
            for (const mentorName of mentors) {
                let mentorId;
                const mentorExist = await prisma.mentors.findFirst({
                    where: {
                        name: mentorName,
                    }
                });

                if(!mentorExist){
                    const newMentor = await prisma.mentors.create({
                        data: {name: mentorName}
                    })
                    mentorId = newMentor.id;
                } else {
                    mentorId = mentorExist.id;
                }

                mentorsId.push(mentorId);
            }

            const mentorsOnCourses = mentorsId.map((mentorId) => ({
                mentor_id: mentorId,
                course: {connect: {id: course.id}}
            }));

            const chaptersData = chapters.map((chapterName) => ({
                name: chapterName,
                lessons: {create: []}
            }));

            await prisma.courses.update({
                where: {id: course_id},
                data: {
                    mentorsOnCourses: {create: {data: mentorsOnCourses}},
                    chapters: {create: {data: chaptersData}}
                }
            })


            // const categoryOnCourse = await prisma.categoriesOnCourses.create({
            //     data: {
            //         category: {connect: {id: categoryId}},
            //         course: {connect: {id: course.id}}}
            //         // course:{create: {name, desc: req.body.desc, price: req.body.price, level: req.body.level, rating: req.body.rating, type: req.body.type, intended_for: req.body.intended_for, total_lesson: req.body.total_lesson, total_duration: req.body.total_duration}}}
            // });


            await prisma.mentorsOnCourses.create({
                data: mentorsOnCourses
            });


//             // Find or Create Category

//             const findCategory = await prisma.categories.upsert({
//                 where: {name: category},
//                 update: {},
//                 create: {name: category}
//             });

//             const addCourse = await prisma.courses.create({
//                 data: {
//                     name: "UI Set Character Design",
//                     desc,
//                     price,
//                     level,
//                     rating,
//                     type,
//                     intended_for,
//                     total_lesson,
//                     total_duration,
//                     category: {
//                         connect: {
//                             category_id: name.findCategory
//                         }
//                     },
//                     mentor: {
//                         create: mentors.map(mentor => ({
//                             mentor: {
//                                 connectOrCreate: {
//                                     where: {name: mentor},
//                                     create: {name: mentor}
//                                 }
//                             }
//                         }))
//                     },
//                     chapter: {
//                         create: chapters.map(chapter => ({name: chapter}))
//                     }
//                 },
//                 include: {
//                     mentor: true,
//                     chapter: true
//                 }
//             });

            return res.status(201).json({
                status: true,
                message: 'Created',
                err: null,
                data: {course, categoryOnCourse, mentorsOnCourses} 
            })
        }catch(err){
            console.log(err);
        }
    }
};