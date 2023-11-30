const router = require('express').Router();
const {register, verify, newOTP, login} = require('../controllers/auth.controllers');
const cors = require('cors');

router.use(cors());

router.post('/register', register);
router.post('/verify', verify);
router.put('/verify/newOtp', newOTP);

router.post('/login', login);

module.exports = router;