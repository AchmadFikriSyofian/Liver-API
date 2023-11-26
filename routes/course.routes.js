const router = require('express').Router();
const {getAllCourse, getDetailCourse} = require('../controllers/course.controllers');

router.get('/list', getAllCourse);
router.get('/details/:id', getDetailCourse);

module.exports = router;