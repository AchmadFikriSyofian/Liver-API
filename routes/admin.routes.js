const router = require('express').Router();
const { dashboard, kelolaKelas, deleteCourse } = require('../controllers/admin.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/dashboard', dashboard);
router.get('/kelolakelas', kelolaKelas);
router.delete('/delete/:id', deleteCourse);

module.exports = router;