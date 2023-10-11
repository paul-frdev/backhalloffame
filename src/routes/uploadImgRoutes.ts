const express = require('express');
const { uploadImages } = require('../controller/uploadImageController');
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImage');
const { authMiddleware } = require('../middlewares/authMiddleware');
const uploadImgRouter = express.Router();

uploadImgRouter.post('/', uploadPhoto.array("images", 10), blogImgResize, uploadImages);

module.exports = uploadImgRouter;
