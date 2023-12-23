const router = require('express').Router();
const { dashboard, kelolaKelas, deleteCourse, login, updateCourse } = require('../controllers/admin.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/dashboard', dashboard);
router.get('/kelolakelas', kelolaKelas);
router.delete('/course/:id', deleteCourse);
router.post('/login', login);
router.put('/course/:id', updateCourse);

module.exports = router;