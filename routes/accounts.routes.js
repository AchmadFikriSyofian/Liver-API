const router = require('express').Router();
const {updateProfile} = require('../controllers/accounts.controllers');
const {image} = require('../libs/multer');

router.put('/updateprofile/:id', image.single('image'), updateProfile);

module.exports = router;