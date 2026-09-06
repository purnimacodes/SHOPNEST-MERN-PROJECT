const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser} = require("../controllers/authController");
const {admin} = require('../middleware/adminMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/user", protect, admin, getUsers);