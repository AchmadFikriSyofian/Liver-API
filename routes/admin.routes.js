const router = require('express').Router();
const {login, addCourse} = require('../controllers/admin.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.post('/login', login);
router.post('/course', addCourse);

module.exports = router;