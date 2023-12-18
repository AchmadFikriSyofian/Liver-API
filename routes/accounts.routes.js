const router = require('express').Router();
const {updateProfile, updatePassword, payment_history, notification} = require('../controllers/accounts.controllers');
const {image} = require('../libs/multer');
const {restrict} = require('../middlewares/auth.middlewares');

router.put('/updateprofile/:id', image.single('image'), restrict, updateProfile);
router.put('/updatepassword/:id', restrict, updatePassword);
router.get('/paymenthistory/:id', payment_history);
router.get('/notification/:id', notification);

module.exports = router;