const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createNewArticle,
  getAllArticles,
  getAllArticleById,
  deleteArticleById,
  getAllPublishedArticles,
} = require('../controller/articleController.ts');

const router = express.Router();

router.post('/', createNewArticle);
router.get('/', getAllArticles);
router.get('/:id', getAllArticleById);
router.delete('/:id', deleteArticleById);
router.get('/', getAllPublishedArticles);

module.exports = router;
