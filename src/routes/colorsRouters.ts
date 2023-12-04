const {
  createColor,
  updateColor,
  getColorById,
  deleteColor,
  getallColors,
} = require("../controller/colorsController");
const express = require("express");
const isAdmin = require("../middlewares/admin");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createColor);
router.put("/:id", updateColor);
router.delete("/:id", deleteColor);
router.get("/:id", getColorById);
router.get("/", getallColors);

module.exports = router;
