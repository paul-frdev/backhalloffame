const { getTags } = require('../controller/tagsController');
const express = require('express');

const router = express.Router();

router.get('/', getTags);

module.exports = router;
