const { createNewBlogCategory, getallCategories, deleteBlogCategory, updateBlogCategory, getBlogCatById } = require('../controller/blogController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createNewBlogCategory);
router.put('/update/:id', updateBlogCategory);
router.get('/', getallCategories);
router.get('/:id', getBlogCatById);
router.delete('/:id', deleteBlogCategory);

module.exports = router;
