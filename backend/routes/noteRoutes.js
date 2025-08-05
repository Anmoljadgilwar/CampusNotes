const express = require("express");
const router = express.Router();
const {
  upload,
  getNotes,
  uploadNote,
  downloadNote,
} = require("../controllers/noteController");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

// Public routes
router.get("/", getNotes);
router.get("/download/:id", auth, downloadNote);

// Admin only routes
router.post("/upload", auth, adminAuth, upload, uploadNote);

module.exports = router;
