const router = require('express').Router();
const {updateProfile, updatePassword, payment_history} = require('../controllers/accounts.controllers');
const {image} = require('../libs/multer');

router.put('/updateprofile/:id', image.single('image'), updateProfile);
router.put('/updatepassword/:id', updatePassword);
router.get('/paymenthistory/:id', payment_history);

module.exports = router;