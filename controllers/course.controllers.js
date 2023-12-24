const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient ();
const {getPagination} = require ('../libs/pagination');
const {
  search,
  filter,
  getByType,
} = require ('../repositories/courses.repository');
const courseService = require ('../services/courses.service');
const {chat} = require ('googleapis/build/src/apis/chat');

module.exports = {
  getAllCourse: async (req, res, next) => {
    try {
      let {limit = 10, page = 1} = req.query;
      limit = Number (limit);
      page = Number (page);

      let courses = await prisma.courses.findMany ({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          category: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const {_count} = await prisma.courses.aggregate ({
        _count: {id: true},
      });

      let pagination = getPagination (req, _count.id, page, limit);

      res.status (200).json ({
        status: true,
        message: 'Show All Course',
        err: null,
        data: {pagination, courses},
      });
    } catch (err) {
      next (err);
    }
  },

  getCoursePopuler: async (req, res, next) => {
    try {
      let {id} = req.params;

      // Get the category
      let category = await prisma.categories.findUnique ({
        where: {id: Number (id)},
      });
      if (!category) {
        return res.status (404).json ({
          status: false,
          message: 'Not Found',
          err: 'Category ID not found',
          data: null,
        });
      }

      // Get the associated courses
      let topCourses = await prisma.categoriesOnCourses.findMany ({
        where: {category_id: Number (id)},
        take: 3,
        orderBy: {
          course: {
            rating: 'desc',
          },
        },
        include: {
          category: {
            select: {
              name: true,
            },
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
                  mentor: true,
                },
              },
            },
          },
        },
      });

      res.status (200).json ({
        status: true,
        message: 'Show Top 3 Most populer Course',
        err: null,
        data: {
          category,
          topCourses,
        },
      });
    } catch (err) {
      next (err);
    }
  },

  getPopulerAll: async (req, res, next) => {
    try {
      const topCourse = await prisma.categoriesOnCourses.findMany ({
        take: 6,
        orderBy: {
          course: {
            rating: 'desc',
          },
        },
        include: {
          category: {
            select: {
              name: true,
            },
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
                  mentor: true,
                },
              },
            },
          },
        },
      });

      res.status (200).json ({
        status: true,
        message: 'Show Top 6 Most Populer Course',
        err: null,
        data: {
          topCourse,
        },
      });
    } catch (err) {
      next (err);
    }
  },

  // Menampilkan Course Detail
  getDetailCourse: async (req, res, next) => {
    try {
      let {id} = req.params;
      let course = await prisma.courses.findUnique ({
        where: {id: Number (id)},
        include: {
          category: {
            select: {
              category: true,
            },
          },
          chapter: {
            select: {
              id: true,
              name: true,
              lesson: {
                select: {
                  id: true,
                  name: true,
                  video: true,
                  desc: true,
                  duration: true,
                  is_done: true,
                },
              },
            },
          },
          mentor: {
            select: {
              mentor: true,
            },
          },
        },
      });

      if (!course) {
        return res.status (400).json ({
          status: false,
          message: 'Bad Request!',
          data: `Course with id ${id} doesn\'t exist!`,
        });
      }

      let total_lesson = 0;
      let total_duration = 0;

      let chapters = course.chapter.map((c) => {
        let lessons = c.lesson.map((l) => {
            total_lesson++;
            total_duration += l.duration;
            return {
                id: l.id,
                name: l.name,
                video: l.video,
                desc: l.desc,
                duration: l.duration,
                is_done: l.is_done
            };
        });
    
        return {
            id: c.id,
            name: c.name,
            lessons
        };
    });
    
    let response = {
        id: course.id,
        title: course.name,
        desc: course.desc,
        intended_for: course.intended_for,
        category: course.category.length ? course.category[0].category : null,
        mentor: course.mentor.length ? course.mentor[0].mentor : null,
        total_lesson,
        total_duration,
        chapter: chapters
    };

      res.status (200).json ({
        status: true,
        message: 'OK!',
        data: response,
      });
    } catch (err) {
      next (err);
    }
  },

  updateIsDone: async (req, res, next) => {
    try {
        let {id} = req.user;
        let {lessonId} = req.body;

        let lessons = await prisma.lessons.findFirst({
            where: {
                id: lessonId,
            },
            include: {
                chapter: {
                    include: {
                        course: true
                    }
                }
            }
        });

        if(!lessons){
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                err: `lesson not found with id ${lessonId}`,
                data: null
            })
        }

        const courseId = lessons.chapter.course.id;

        let enrollment = await prisma.enrollments.findFirst({
            where: {
                user_id: id,
                course_id_enrollment: courseId
            }
        });

        if(!enrollment) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                err: `Enrollment not found for user with id ${id}`,
                data: null
            })
        }

        const updatedLesson = await prisma.lessons.update({
            where: {id: lessonId},
            data: {is_done: true}
        })

        res.status(200).json({
            status: true,
            message: 'OK',
            err: null,
            data: {updatedLesson}
        })

    } catch(err){
        next(err);
    }
  },

  isBuy: async (req, res, next) => {
    try {
      let {id} = req.user;
      let {courseId} = req.body;

      let buyed = await prisma.enrollments.findFirst({
          where: {
              user_id: id,
              course_id_enrollment: courseId
          }
      });

      if(!buyed) {
        return res.status(400).json({
            status: false,
            message: 'Bad Request',
            err: `Enrollment not found for user with id ${id}`,
            data: null
        })
      }

      res.status(200).json({
        status: true,
        message: 'OK',
        err: null,
        data: 'coursedetail'
      })

    } catch (err) {
        next(err);
    }
  },

  search: async (req, res, next) => {
    try {
      const result = await search (req);

      res.status (200).json ({
        data: result,
      });
    } catch (err) {
      next (err);
    }
  },

  getByCategory: async (req, res, next) => {
    try {
      const result = await getByCategory (req);

      res.status (200).json ({
        data: result,
      });
    } catch (error) {
      next (error);
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

  getByEnrollment: async (req, res, next) => {
    try {
      const {limit = 10, page = 1} = req.query;
      let {id} = req.user;

      const {result, pagination} = await courseService.getByEnrollment ({
        user_id: req.user.id,
        limit,
        page,
        req,
      });

      res.status (200).json ({
        data: {result, pagination},
      });
    } catch (error) {
      next (error);
    }
  },

  getPremiumCourse: async (req, res, next) => {
    try {
      const {categoryId, level, sortBy} = req.query;

      let courseQuery = {
        where: {
          ...(categoryId ? {category_id: Number (categoryId)} : {}),
          course: {
            level: level,
            type: 'isPremium',
          },
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          course: {
            select: {
              name: true,
              price: true,
              image: true,
              level: true,
              rating: true,
              total_lesson: true,
              total_duration: true,
              createdAt: true,
              mentor: {
                select: {
                  mentor: true,
                },
              },
            },
          },
        },
      };

      if (sortBy) {
        switch (sortBy) {
          case 'latest':
            courseQuery.orderBy = {course: {createdAt: 'desc'}};
            break;
          case 'populer':
            courseQuery.orderBy = {course: {rating: 'desc'}};
            break;
          // case 'promo':
          //     courseQuery.where.course.price =
          default:
            break;
        }
      }

      let courses = await prisma.categoriesOnCourses.findMany (courseQuery);

      // let filteredCourse = course.filter((course) => course.course !== null );

      if (courses.length === 0) {
        return res.status (404).json ({
          status: false,
          message: 'Data is not found',
          err: 'Not Found',
          data: null,
        });
      }

      courses = courses.map(c => {
        return {
            id: c.course_id,
            name: c.course.name,
            price: c.course.price,
            image: c.course.image,
            level: c.course.level,
            rating: c.course.rating,
            total_lesson: c.course.total_lesson,
            total_duration: c.course.total_duration,
            createdAt: c.course.createdAt,
            mentor: c.course.mentor.length ? c.course.mentor[0].mentor : [],
            category: {
                id: c.category_id,
                name: c.category.name
          }
        };
    });

      res.status (200).json ({
        status: true,
        message: 'OK!',
        err: null,
        data: courses,
      });
    } catch (err) {
      next (err);
    }
  },

  getFreeCourse: async (req, res, next) => {
    try {
      const {categoryId, level, sortBy} = req.query;

      let courseQuery = {
        where: {
          ...(categoryId ? {category_id: Number (categoryId)} : {}),
          course: {
            level: level,
            type: 'isFree',
          },
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          course: {
            select: {
              name: true,
              price: true,
              image: true,
              level: true,
              rating: true,
              total_lesson: true,
              total_duration: true,
              mentor: {
                select: {
                  mentor: true,
                },
              },
            },
          },
        },
      };

      if (sortBy) {
        switch (sortBy) {
          case 'latest':
            courseQuery.orderBy = {course: {createdAt: 'desc'}};
            break;
          case 'populer':
            courseQuery.orderBy = {course: {rating: 'desc'}};
            break;
          // case 'promo':
          //     courseQuery.where.course.price =
          default:
            break;
        }
      }

      const course = await prisma.categoriesOnCourses.findMany (courseQuery);

      let filteredCourse = course.filter (course => course.course !== null);

      if (filteredCourse.length === 0) {
        return res.status (404).json ({
          status: false,
          message: 'Data is not found',
          err: 'Not Found',
          data: null,
        });
      }

      res.status (200).json ({
        status: true,
        message: 'OK!',
        err: null,
        data: filteredCourse,
      });
    } catch (err) {
      next (err);
    }
  },

  getAllFreePrem: async (req, res, next) => {
    try {
      const {categoryId, level, sortBy} = req.query;

      let courseQuery = {
        where: {
          ...(categoryId ? {category_id: Number (categoryId)} : {}),
          course: {
            level: level,
          },
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          course: {
            select: {
              name: true,
              price: true,
              image: true,
              level: true,
              type: true,
              rating: true,
              total_lesson: true,
              total_duration: true,
              mentor: {
                select: {
                  mentor: true,
                },
              },
            },
          },
        },
      };

      if (sortBy) {
        switch (sortBy) {
          case 'latest':
            courseQuery.orderBy = {course: {createdAt: 'desc'}};
            break;
          case 'populer':
            courseQuery.orderBy = {course: {rating: 'desc'}};
            break;
          // case 'promo':
          //     courseQuery.where.course.price =
          default:
            break;
        }
      }

      const course = await prisma.categoriesOnCourses.findMany (courseQuery);

      let filteredCourse = course.filter (course => course.course !== null);

      if (filteredCourse.length === 0) {
        return res.status (404).json ({
          status: false,
          message: 'Data is not found',
          err: 'Not Found',
          data: null,
        });
      }

      res.status (200).json ({
        status: true,
        message: 'OK!',
        err: null,
        data: filteredCourse,
      });
    } catch (err) {
      next (err);
    }
  },
};
