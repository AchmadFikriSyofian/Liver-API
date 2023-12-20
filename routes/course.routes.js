const router = require('express').Router();
const {getAllCourse, getCoursePopuler, getPopulerAll, getDetailCourse, search, filter, getByEnrollment, getPremiumCourse, getFreeCourse, getAllFreePrem} = require('../controllers/course.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/list', restrict, getAllCourse);
router.get('/populer/:id', restrict, getCoursePopuler);
router.get('/populerall', restrict, getPopulerAll);
router.get('/details/:id', restrict, getDetailCourse);
router.get('/premium', restrict, getPremiumCourse);
router.get('/free', restrict, getFreeCourse);
router.get('/search/', restrict, search);
router.get('/filter/', restrict, filter);
router.get('/user-enrollement/', getByEnrollment);
router.get('/all', restrict, getAllFreePrem);

module.exports = router;