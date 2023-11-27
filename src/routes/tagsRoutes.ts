const { getProductTags, getTestimonialAdminTag, getTestimonialUserTag } = require('../controller/tagsController');
const express = require('express');

const router = express.Router();

router.get('/', getProductTags);
router.get('/admin', getTestimonialAdminTag);
router.get('/user', getTestimonialUserTag);

module.exports = router;
