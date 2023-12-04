const {
  createPrCategory,
  updatePrCategory,
  deletePrCategory,
  getPrCategoryById,
  getallPrCategories,
} = require("../controller/productCategoriesController");
const express = require("express");
const isAdmin = require("../middlewares/admin");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createPrCategory);
router.put("/:id", updatePrCategory);
router.delete("/:id", deletePrCategory);
router.get("/:id", getPrCategoryById);
router.get("/", getallPrCategories);

module.exports = router;
