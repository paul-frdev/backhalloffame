const { createProduct, getProducts } = require('../controller/productController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);

module.exports = router;