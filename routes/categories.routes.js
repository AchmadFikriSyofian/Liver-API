const router = require('express').Router();
const {getAllCategories, getCategoriesDetail} = require('../controllers/categories.controllers');
const cors = require('cors');

router.use(cors());

router.get('/', getAllCategories);
router.get('/detail/:id', getCategoriesDetail);

module.exports = router;