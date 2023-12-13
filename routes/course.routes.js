const router = require('express').Router();
const {getAllCourse, getDetailCourse, search, filter, getPremiumCourse, getFreeCourse} = require('../controllers/course.controllers');

router.get('/list', getAllCourse);
router.get('/details/:id', getDetailCourse);
router.get('/premium', getPremiumCourse);
router.get('/free', getFreeCourse);
router.get('/search/', search);
router.get('/filter/', filter);

module.exports = router;