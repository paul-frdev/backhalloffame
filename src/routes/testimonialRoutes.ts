const { createTestimonial } = require('../controller/testimonialController');
const express = require('express');
const router = express.Router();

router.post('/', createTestimonial);

module.exports = router;
