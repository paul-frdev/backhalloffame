const { getAbout, createAbout, updateAbout, getAboutUs } = require('../controller/aboutController');
const express = require('express');

const router = express.Router();

//about
router.get('/about/:id', getAbout);
router.post('/about', createAbout);
router.put('/about/:id', updateAbout);
router.get('/about', getAboutUs);
module.exports = router;
