const express = require("express");
const { create, getCards } = require("../controllers/cardsController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", authMiddleware, create);
router.get("/", authMiddleware, getCards);
module.exports = router;
