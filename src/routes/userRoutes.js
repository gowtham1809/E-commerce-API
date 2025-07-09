const express = require("express");
const { create, get, getById, put, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.post("/",create);
router.get("/", get);
router.get("/:id",getById);
router.put("/:id",put);
router.delete("/",deleteUser);
module.exports = router;
