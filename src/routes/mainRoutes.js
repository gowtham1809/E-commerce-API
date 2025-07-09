const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const cardsRoutes = require("./cardsRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/post", postRoutes);
router.use("/cards", cardsRoutes);

module.exports = router;
