const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const imagekit = require('../libs/imagekit');
const path = require('path'); 


module.exports = {
    updateProfile: async(req, res, next) => {
        try{
            let {id} = req.params;
            let {foto_profile, name, email, no_hp, country, city} = req.body;

            const userExist = await prisma.users.findUnique({where: {id: Number(id)}});
            if(!userExist){
                return res.status(404).json({
                    status: false,
                    message: 'Not Found',
                    err: 'User ID is not Exist',
                    data: null
                });
            }

            let strFile = req.file.buffer.toString('base64');

            let {url} = await imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile
            });

            let updateOperation = await prisma.users.upsert({
                where: {id: Number(id)},
                update: {foto_profile: url, name, email, password: userExist.password, no_hp, country, city},
                create: {id: Number(id), foto_profile: url, name, email, password: userExist.password, no_hp, country, city}
            });

            return res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: {updateOperation}
            })

        } catch(err){
            next(err);
        }
    }
};