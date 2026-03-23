const express = require("express");
const router = express.Router();
const {
  upload,
  getNotes,
  uploadNote,
  getNoteById,
  getNoteThumbnail,
  downloadNote,
  previewNote,
  updateNote,
  togglePinNote,
  deleteNote,
} = require("../controllers/noteController");
const auth = require("../middleware/auth");

// Public routes
router.get("/", getNotes);
router.get("/thumbnail/:id", getNoteThumbnail);
router.get("/:id", auth, getNoteById);
router.get("/download/:id", auth, downloadNote);
router.get("/preview/:id", auth, previewNote);

// Authenticated user routes (all users can upload)
router.post("/upload", auth, upload, uploadNote);
router.put("/:id", auth, upload, updateNote);
router.patch("/:id/pin", auth, togglePinNote);

// Owner or admin routes
router.delete("/:id", auth, deleteNote);

module.exports = router;
