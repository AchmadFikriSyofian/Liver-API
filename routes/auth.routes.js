const router = require('express').Router();
const {register, verifyEmail, getNewOTP, login} = require('../controllers/auth.controllers');

router.post('/register', register);
router.post('/verify', verifyEmail);
router.get('/verify/newOtp/:email', getNewOTP);

router.post('/login', login);

module.exports = router;