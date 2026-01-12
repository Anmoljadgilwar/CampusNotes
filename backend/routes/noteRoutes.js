const express = require("express");
const router = express.Router();
const {
  upload,
  getNotes,
  uploadNote,
  downloadNote,
  deleteNote,
} = require("../controllers/noteController");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

// Public routes
router.get("/", getNotes);
router.get("/download/:id", auth, downloadNote);

// Authenticated user routes (all users can upload)
router.post("/upload", auth, upload, uploadNote);

// Admin only routes
router.delete("/:id", auth, adminAuth, deleteNote);

module.exports = router;
