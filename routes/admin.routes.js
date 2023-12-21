const router = require('express').Router();
const { dashboard, kelolaKelas } = require('../controllers/admin.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/dashboard', dashboard);
router.get('/kelolakelas', kelolaKelas);

module.exports = router;