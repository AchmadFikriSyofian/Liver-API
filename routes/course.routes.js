const router = require('express').Router();
const {getAllCourse, getDetailCourse, getPremiumCourse, getFreeCourse} = require('../controllers/course.controllers');

router.get('/list', getAllCourse);
router.get('/details/:id', getDetailCourse);
router.get('/premium', getPremiumCourse);
router.get('/free', getFreeCourse);

module.exports = router;