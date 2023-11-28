const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const search = async req => {
  const {search} = req.query;

  const result = await prisma.courses.findMany ({
    where: {
      name: {
        contains: search,
      },
    },
  });

  if (!result) throw new Error (`Cource tidak ditemukan`);

  return result;
};

const filter = async req => {
  const {category, level, promotionId, } = req.query;

  const result = await prisma.courses.findMany ({
    where: {
      OR: [
        {
          categoriesOnCourses: {
            some: {
              category_id: {
                contains: category,
              },
            },
          },
        },
        {
          level: {
            contains: level,
          },
        },
        {
          mentorsOnCourses: {
            some: {
              assignedAt: 'asc',
            },
          },
        },
        {
          promotion_id: {
            contains: promotionId
          }
        }
      ],
    },
  });

  if (!result) throw new Error (`Cource tidak ditemukan`);

  return result;
};

const getByType = async req => {
  const {type} = req.body;
  let {limit = 10, page = 1} = req.query;
  limit = Number (limit);
  page = Number (page);

  const result = await prisma.courses.findMany ({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      type: {
        contains: type,
      },
    },
  });

  const {_count} = await prisma.courses.aggregate ({
    _count: {id: true},
  });

  let pagination = getPagination (req, _count.id, page, limit);

  if (!result) throw new Error (`Cource tidak ditemukan`);

  return {result, pagination};
};

module.exports = {search, filter, getByType};
