const {PrismaClient} = require ('@prisma/client');
const {nanoid} = require ('nanoid');
const prisma = new PrismaClient ();

const create = async ({price, metode_pembayaran, user_id, course_id}) => {
  const id = `enrollment-${nanoid (16)}`;

  const result = await prisma.enrollments.create ({
    data: {
      id: id,
      price: Number(price),
      metodePembayaran: metode_pembayaran,
      user_id: user_id,
      course_id_enrollment: Number(course_id),
    },
  });

  return result;
};

module.exports = {create};
