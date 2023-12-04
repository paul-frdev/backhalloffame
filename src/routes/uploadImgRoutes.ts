const express = require("express");
const {
  uploadImages,
  deleteImages,
  getImageById,
} = require("../controller/uploadImageController");
const {
  uploadPhoto,
  blogImgResize,
  productImgResize,
} = require("../middlewares/uploadImage");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/",
  uploadPhoto.array("images", 10),
  blogImgResize,
  productImgResize,
  uploadImages,
);
router.delete("/delete-img/:id", deleteImages);
router.get("/get-image/:id", getImageById);

module.exports = router;
