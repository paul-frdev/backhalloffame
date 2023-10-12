const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');
const { createNewArticle, getAllArticles, getAllArticleById } = require('../controller/articleController.ts');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createNewArticle);
router.get('/', getAllArticles);
router.get('/:id', getAllArticleById);

module.exports = router;
