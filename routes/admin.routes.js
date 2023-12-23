const router = require('express').Router();
const {dashboard, kelolaKelas, deleteCourse, login, addCourse, getAllCourse, addCategory, addMentor, getAllMentor, addChapter, addLesson, getAllChapter} = require('../controllers/admin.controllers');
const {image} = require('../libs/multer');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/dashboard', dashboard);
router.get('/kelolakelas', kelolaKelas);
router.delete('/course/:id', deleteCourse);
router.post('/login', login);
router.post('/category', image.single('image'), addCategory);
router.post('/mentor', addMentor);
router.get('/mentor', getAllMentor);
router.post('/course', addCourse);
router.get('/course', getAllCourse);
router.post('/chapter', addChapter);
router.get('/chapter', getAllChapter);
router.post('/lesson', addLesson);

module.exports = router;