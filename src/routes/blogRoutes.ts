const { createNewBlogCategory, getallCategories, deleteBlogCategory, updateBlogCategory } = require('../controller/blogController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createNewBlogCategory);
router.put('/:id', updateBlogCategory)
router.get('/', getallCategories);
router.delete('/:id', deleteBlogCategory);

module.exports = router;
