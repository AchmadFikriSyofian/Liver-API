const router = require('express').Router();
const {getAllCourse, getDetailCourse, search, filter, getByEnrollment, getPremiumCourse, getFreeCourse} = require('../controllers/course.controllers');

router.get('/list', getAllCourse);
router.get('/details/:id', getDetailCourse);
router.get('/premium', getPremiumCourse);
router.get('/free', getFreeCourse);
router.get('/search/', search);
router.get('/filter/', filter);
router.get('/user-enrollement/', getByEnrollment);

module.exports = router;