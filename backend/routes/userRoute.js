const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers,getUserById } = require("../controllers/userController");

const router = express.Router();

//User Management Routes

router.get("/", protect, adminOnly, getUsers); //Get all users
router.get("/:id", protect, getUserById);//GEt a specific user


module.exports = router;