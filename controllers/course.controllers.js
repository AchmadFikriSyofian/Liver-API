const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient ();
const {getPagination} = require ('../libs/pagination');
const {search, filter, getByEnrollment} = require ('../repositories/course');

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

  // Menampilkan Course Detail
  getDetailCourse: async (req, res, next) => {
    try {
      let {id} = req.params;
      let course = await prisma.courses.findUnique ({
        where: {id: Number (id)},
        include: {
          chapter: {
            include: {
              lesson: {
                select: {
                  name: true,
                  video: true,
                  desc: true,
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

      res.status (200).json ({
        status: true,
        message: 'OK!',
        data: course,
      });
    } catch (err) {
      next (err);
    }
  },

  search: async (req, res, next) => {
    try {
      const {result, pagination} = await search (req);

      res.status (200).json ({
        data: {result, pagination},
      });
    } catch (err) {
      next (err);
    }
  },

  filter: async (req, res, next) => {
    try {
      const {result, pagination} = await filter (req);

      res.status (200).json ({
        data: {result, pagination},
      });
    } catch (error) {
      next (error);
    }
  },

  getByEnrollment: async (req, res, next) => {
    try {
      const {result, pagination} = await getByEnrollment (req);

      res.status (200).json ({
        data: {result, pagination},
      });
    } catch (error) {
      next (error);
    }
  },
};
