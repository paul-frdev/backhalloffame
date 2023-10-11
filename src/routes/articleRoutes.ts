const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');
const { createNewArticle } = require('../controller/articleController.ts');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createNewArticle);

module.exports = router;
