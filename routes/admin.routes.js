const router = require('express').Router();
const {login} = require('../controllers/admin.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.post('/login', login);


module.exports = router;