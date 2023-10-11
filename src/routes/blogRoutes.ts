const { createNewBlogCategory, getallCategories, createNewArticle } = require('../controller/blogController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createNewBlogCategory);
router.post('/', authMiddleware, isAdmin, createNewArticle);
router.get('/', getallCategories);

module.exports = router;
