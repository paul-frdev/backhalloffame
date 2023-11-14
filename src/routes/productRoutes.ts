const { createProduct, getProducts, deleteProductById } = require('../controller/productController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.delete('/:id', deleteProductById);

module.exports = router;
