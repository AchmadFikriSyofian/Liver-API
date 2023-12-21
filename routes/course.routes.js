const router = require('express').Router();
const {getAllCourse, getCoursePopuler, getPopulerAll, getDetailCourse, updateIsDone, search, filter, getByEnrollment, getPremiumCourse, getFreeCourse, getAllFreePrem} = require('../controllers/course.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/list', restrict, getAllCourse);
router.get('/populer/:id', getCoursePopuler);
router.get('/populerall', getPopulerAll);
router.get('/details/:id', restrict, getDetailCourse);
router.put('/updateisdone', restrict, updateIsDone);
router.get('/premium', restrict, getPremiumCourse);
router.get('/free', restrict, getFreeCourse);
router.get('/search/', search);
router.get('/filter/', restrict, filter);
router.get('/user-enrollement', restrict, getByEnrollment);
router.get('/all', restrict, getAllFreePrem);

module.exports = router;