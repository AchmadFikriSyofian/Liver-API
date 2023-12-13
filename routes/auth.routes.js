const router = require('express').Router();
const { register, verify, newOTP, login, forgotPassword, resetPassword  } = require('../controllers/auth.controllers');

router.post('/forget-password', forgotPassword);
router.put('/updatepass', resetPassword);
router.post('/register', register);
router.post('/verify', verify);
router.put('/verify/newOtp', newOTP);

router.post('/login', login);

module.exports = router;