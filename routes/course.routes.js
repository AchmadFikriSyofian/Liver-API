const router = require('express').Router();
const {getAllCourse, getCoursePopuler, getPopulerAll, getDetailCourse, updateIsDone, search, filter, getByEnrollment, getPremiumCourse, getFreeCourse, getAllFreePrem, rating} = require('../controllers/course.controllers');
const {addCourse} = require('../controllers/admin.controllers');
const {restrict, admin} = require('../middlewares/auth.middlewares');
const {index, create} = require('../controllers/course.controller.test.js');

router.get('/list', getAllCourse);
router.get('/populer/:id', getCoursePopuler);
router.get('/populerall', getPopulerAll);
router.get('/details/:id', getDetailCourse);
router.post('/rating/:id', rating);
router.put('/updateisdone', restrict, updateIsDone);
router.get('/premium', getPremiumCourse);
router.get('/free', getFreeCourse);
router.get('/search/', search);
router.get('/filter/', filter);
router.get('/user-enrollement/', restrict, getByEnrollment);
router.get('/all', getAllFreePrem);

module.exports = router;