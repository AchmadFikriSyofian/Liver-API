const router = require('express').Router();
const { dashboard, kelolaKelas, deleteCourse, login } = require('../controllers/admin.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/dashboard', dashboard);
router.get('/kelolakelas', kelolaKelas);
router.delete('/course/:id', deleteCourse);
router.post('/login', login);

module.exports = router;