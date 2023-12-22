const router = require('express').Router();
const {getAllCourse, getCoursePopuler, getPopulerAll, getDetailCourse, updateIsDone, search, filter, getByEnrollment, getPremiumCourse, getFreeCourse, getAllFreePrem} = require('../controllers/course.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/list', restrict, getAllCourse);
router.get('/populer/:id', getCoursePopuler);
router.get('/populerall', getPopulerAll);
router.get('/details/:id', getDetailCourse);
router.put('/updateisdone', restrict, updateIsDone);
router.get('/premium', getPremiumCourse);
router.get('/free', getFreeCourse);
router.get('/search/', search);
router.get('/filter/', filter);
router.get('/user-enrollement', getByEnrollment);
router.get('/all', getAllFreePrem);

module.exports = router;