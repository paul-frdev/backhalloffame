const { createSize, updateSize, deleteSize, getSizeById, getallSizes } = require('../controller/sizesController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', createSize);
router.put('/:id', updateSize);
router.delete('/:id', deleteSize);
router.get('/:', getSizeById);
router.get('/', getallSizes);

module.exports = router;
