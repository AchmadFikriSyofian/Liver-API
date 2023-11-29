const prisma = require ('../libs/prisma');

const search = async req => {
  const {name} = req.query;

  const result = await prisma.courses.findMany ({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });

  if (!result) throw new Error (`Cource tidak ditemukan`);

  return result;
};

const filter = async req => {
  const {category, level, promotionId} = req.query;

  const result = await prisma.courses.findMany ({
    where: {
      OR: [
        {
          category: {
            some: {
              category_id: Number(category)
            }
          }
        },
        {
          level: level
        }
      ]
    }
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
