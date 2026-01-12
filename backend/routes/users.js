const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");

// Public route - anyone can view user profiles
router.get("/:id", getUserProfile);

module.exports = router;
