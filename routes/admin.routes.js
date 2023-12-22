const router = require('express').Router();
const {login, addCourse, addCategory} = require('../controllers/admin.controllers');
const {image} = require('../libs/multer');
const {restrict} = require('../middlewares/auth.middlewares');

router.post('/login', login);
router.post('/category', image.single('image'), addCategory);
router.post('/course', addCourse);

module.exports = router;