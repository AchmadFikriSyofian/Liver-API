const router = require('express').Router();
const {updateProfile, updatePassword} = require('../controllers/accounts.controllers');
const {image} = require('../libs/multer');

router.put('/updateprofile/:id', image.single('image'), updateProfile);
router.put('/updatepassword/:id', updatePassword);

module.exports = router;