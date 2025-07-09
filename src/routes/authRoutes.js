const express = require("express");
const { signUp, login, getUserInfo } = require("../controllers/userAuth");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getUserInfo);
router.post("/login", login);
router.post("/signUp", signUp);
router.post("/logout", logout);

module.exports = router;
