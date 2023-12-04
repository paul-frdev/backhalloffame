const express = require("express");
const isAdmin = require("../middlewares/admin");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createNewArticle,
  getBlogArticles,
  getArticleById,
  deleteArticleById,
  getAllPublishedArticles,
  getMediaArticles,
  getMediaArticleById,
} = require("../controller/articleController.ts");

const router = express.Router();

router.post("/article", createNewArticle);

// blog articles
router.get("/blog/articles", getBlogArticles);

//media articles
router.get("/media/articles", getMediaArticles);
router.get("/media/article/:id", getMediaArticleById);

router.get("/article/:id", getArticleById);
router.delete("/article/:id", deleteArticleById);
router.get("/", getAllPublishedArticles);

module.exports = router;
