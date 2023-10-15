const { createBrand, updateBrand, deleteBrand, getBrandById, getallBrands } = require('../controller/brandsController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', createBrand);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);
router.get('/:id', getBrandById);
router.get('/', getallBrands);

module.exports = router;
