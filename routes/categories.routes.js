const router = require('express').Router();
const {getAllCategories, getCategoriesDetail} = require('../controllers/categories.controllers');
const {restrict} = require('../middlewares/auth.middlewares');

router.get('/', restrict, getAllCategories);
router.get('/detail/:id', restrict, getCategoriesDetail);

module.exports = router;