const {getPagination} = require ('../libs/pagination');
const {PrismaClient} = require ('@prisma/client');
const {getById} = require ('./course');
const CreditCard = require ('./creditCard');
const { nanoid } = require('nanoid');
const prisma = new PrismaClient ();

const create = async (req) => {
  const {course_id} = req.params;
  const {user_id} = req.body;
  const {metode_pembayaran} = req.body;

  const id = `enrollment-${nanoid(16)}`;;

  const course = await getById (course_id);

  if (course.type === 'isPremium') {
    if (metode_pembayaran === 'creditCard') {
      await CreditCard.create (req);
      const price = course.price + course.price * 0.11;

      const result = await prisma.enrollments.create ({
        data: {
          id: id,
          price: price,
          metodePembayaran: metode_pembayaran,
          user_id: user_id,
          course_id_enrollment: course_id,
        },
      });

      const card = await CreditCard.getByUserId (user_id);
      return {
        id: result.id,
        price: result.price,
        statusPembayaran: result.statusPembayaran,
        metodePembayaran: result.metodePembayaran,
        user_id: result.user_id,
        creditCard: {
          id: card.id,
          number: card.number,
          name: card.name,
          cvv: card.cvv,
          expired: card.expired
        }
      };
    }
  }
};

module.exports = {create};
