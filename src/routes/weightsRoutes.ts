const {
  createWeight,
  updateWeight,
  deleteWeight,
  getWeightById,
  getallWeights,
} = require("../controller/weightsController");
const express = require("express");
const isAdmin = require("../middlewares/admin");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createWeight);
router.put("/:id", updateWeight);
router.delete("/:id", deleteWeight);
router.get("/:id", getWeightById);
router.get("/", getallWeights);

module.exports = router;
