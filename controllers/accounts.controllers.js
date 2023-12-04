const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    profile: async(req, res, next) => {
        try{
            let {name, email, no_hp, negara, kota} = req.body;

            const user = await prisma.users.findUnique({where: {email}});
        } catch(err){
            next(err);
        }
    }
}