const express = require('express');
const { uploadImages, deleteImages, updateImage } = require('../controller/uploadImageController');
const { uploadPhoto, blogImgResize, productImgResize } = require('../middlewares/uploadImage');
const { authMiddleware } = require('../middlewares/authMiddleware');
const imgRouter = express.Router();

imgRouter.post('/', uploadPhoto.array('images', 10), blogImgResize, productImgResize, uploadImages);
imgRouter.delete('/delete-img/:id', deleteImages);

module.exports = imgRouter;
