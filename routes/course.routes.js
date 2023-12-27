const router = require('express').Router();
const {getAllCourse, getCoursePopuler, getPopulerAll, getDetailCourse, updateIsDone, search, filter, getByEnrollment, getPremiumCourse, getFreeCourse, getAllFreePrem } = require('../controllers/course.controllers');
const {addCourse} = require('../controllers/admin.controllers');
const {restrict, admin, isBuy} = require('../middlewares/auth.middlewares');
const {index, create} = require('../controllers/course.controller.test.js');

router.get('/list', restrict, getAllCourse);
router.get('/populer/:id', getCoursePopuler);
router.get('/populerall', getPopulerAll);
router.get('/details/:courseId', isBuy, getDetailCourse);
router.put('/updateisdone', restrict, updateIsDone);
router.get('/premium', getPremiumCourse);
router.get('/free', getFreeCourse);
router.get('/search/', search);
router.get('/filter/', filter);
router.get('/user-enrollment', restrict, getByEnrollment);
router.get('/all', getAllFreePrem);

router.get('/', index)
// router.get('/:id', show)
router.post('/', restrict, admin, create);
router.put('/:id', restrict, admin, create);
router.delete('/:id', restrict, admin, create);

module.exports = router;