const router = require('express').Router();
const { forgotPassword, resetPassword  } = require('../controllers/auth.controllers');

router.post('/forget-password', forgotPassword);
router.put('/reset-password/', resetPassword);

module.exports = router;