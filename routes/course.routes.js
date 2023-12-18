const router = require('express').Router();
const {getAllCourse, getCoursePopuler, getPopulerAll, getDetailCourse, search, filter, getByEnrollment, getPremiumCourse, getFreeCourse, getAllFreePrem} = require('../controllers/course.controllers');

router.get('/list', getAllCourse);
router.get('/populer/:id', getCoursePopuler);
router.get('/populerAll', getPopulerAll);
router.get('/details/:id', getDetailCourse);
router.get('/premium', getPremiumCourse);
router.get('/free', getFreeCourse);
router.get('/search/', search);
router.get('/filter/', filter);
router.get('/all', getAllFreePrem);

module.exports = router;