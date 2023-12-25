const router = require('express').Router();
const {getAllCategories, getCategoriesDetail} = require('../controllers/categories.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/', getAllCategories);
router.get('/detail/:id', getCategoriesDetail);

module.exports = router;