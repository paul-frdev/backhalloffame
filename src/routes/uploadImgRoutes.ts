const express = require('express');
const { uploadImages, deleteImages } = require('../controller/uploadImageController');
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImage');
const { authMiddleware } = require('../middlewares/authMiddleware');
const imgRouter = express.Router();

imgRouter.post('/', uploadPhoto.array('images', 10), blogImgResize, uploadImages);
imgRouter.delete('/delete-img/:id', deleteImages);

module.exports = imgRouter;
