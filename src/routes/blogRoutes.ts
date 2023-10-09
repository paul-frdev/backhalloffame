const { createNewBlogCategory } = require('../controller/blogController');
const express = require('express');
const isAdmin = require('../middlewares/admin');

const router = express.Router();

router.post('/', createNewBlogCategory);

module.exports = router;
