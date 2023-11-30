const router = require('express').Router();
const {getAllCourse, getDetailCourse, search, filter} = require('../controllers/course.controllers');
const cors = require('cors');

router.use(cors());

router.get('/list', getAllCourse);
router.get('/details/:id', getDetailCourse);
router.get('/search/', search);
router.get('/filter/', filter);

module.exports = router;