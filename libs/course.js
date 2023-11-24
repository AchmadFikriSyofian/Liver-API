const prisma = require ('./prisma');

const search = async req => {
  const {name} = req.body;

  const result = await prisma.courses.findMany ({
    where: {
      name: {
        contains: name,
      },
    },
  });

  if (!result) throw new Error (`Cource tidak ditemukan`);

  return result;
};

const getByCategory = async req => {
  const {category_id} = req.body;

  const result = await prisma.courses.findMany ({
    where: {
      category_id: {
        contains: category_id,
      },
    },
  });

  if (!result) throw new Error (`Cource tidak ditemukan`);

  return result;
};



module.exports = {search, getByCategory};
