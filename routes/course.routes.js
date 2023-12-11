const router = require('express').Router();
const {getAllCourse, getDetailCourse, search, filter, getByEnrollment, getPremiumCourse} = require('../controllers/course.controllers');

router.get('/list', getAllCourse);
router.get('/details/:id', getDetailCourse);
router.get('/premium/:categoryId&&?level=level', getPremiumCourse);
router.get('/search/', search);
router.get('/filter/', filter);
router.get('/user-enrollement/', getByEnrollment);

module.exports = router;