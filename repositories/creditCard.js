const { nanoid } = require('nanoid');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient ();

const create = async (req) => {
  const {user_id} = req.params;
  const {card_number, card_name, cvv, card_expired} = req.body;
  const id = `card-${nanoid(16)}`;

  await prisma.createCard, create ({
    data: {
      id: id,
      number: card_number,
      name: card_name,
      cvv: cvv,
      expired: card_expired,
      user_id: user_id,
    },
  });
};

const getByUserId = async (user_id) => {
  const result = await prisma.createCard.findUnique ({
    where: {
      user_id: user_id,
    },
  });

  return result;
};

module.exports = {create, getByUserId};
