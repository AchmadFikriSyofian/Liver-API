const router = require('express').Router();
const {getAllCourse, getDetailCourse, getPremiumCourse, search, filter} = require('../controllers/course.controllers');

router.get('/list', getAllCourse);
router.get('/details/:id', getDetailCourse);
router.get('/premium/:categoryId&&?level=level', getPremiumCourse);
router.get('/search/', search);
router.get('/filter/', filter);

module.exports = router;