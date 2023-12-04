const express = require("express");
const isAdmin = require("../middlewares/admin");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createNewTicket,
  getAllTickets,
  geTicketById,
  deleteTicket,
} = require("../controller/ticketImgController");

const router = express.Router();

router.post("/", createNewTicket);
router.get("/", getAllTickets);
router.get("/:id", geTicketById);
router.delete("/:id", deleteTicket);

module.exports = router;
