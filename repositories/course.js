const {getPagination} = require ('../libs/pagination');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient ();

const search = async req => {
  const {name} = req.query;
  let {limit = 10, page = 1} = req.query;
  limit = Number (limit);
  page = Number (page);

  const result = await prisma.courses.findMany ({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
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

const filter = async req => {
  const {category, level, rating, terbaru} = req.query;
  let {limit = 10, page = 1} = req.query;
  limit = Number (limit);
  page = Number (page);

  const orderByRating = rating ? {rating: 'asc'} : {};
  const orderByAssignedAt = terbaru ? {createdAt: 'asc'} : {};

  const result = await prisma.courses.findMany ({
    where: {
      OR: [
        {
          category: {
            some: {
              category_id: Number (category),
            },
          },
        },
        {
          level: level,
        },
      ],
    },
    orderBy: [orderByRating, orderByAssignedAt],
  });

  const {_count} = await prisma.courses.aggregate ({
    _count: {id: true},
  });

  let pagination = getPagination (req, _count.id, page, limit);

  if (!result.length) throw new Error (`Kursus tidak ditemukan`);

  return {result, pagination};
};

const getByEnrollment = async req => {
  const {user} = req.query;
  let {limit = 10, page = 1} = req.query;
  limit = Number (limit);
  page = Number (page);

  const result = await prisma.courses.findMany ({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      enrollment: {
        some: {
          user_id: Number (user),
        },
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

const getById = async (id) => {
  const course = await prisma.courses.findUnique ({
    where: {
      id: id,
    },
  });

  return course;
}

module.exports = {search, filter, getByEnrollment, getById};