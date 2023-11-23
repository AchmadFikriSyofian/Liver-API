const router = require('express').Router();
const {getAllCourse} = require('../controllers/course.controllers');

router.get('/list', getAllCourse);

module.exports = router;