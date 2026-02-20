const Note = require("../models/Note");

// Import the upload configuration that handles different storage for files and thumbnails
const handleUpload = require("../config/uploadConfig");

// Get all notes (optionally by category)
const getNotes = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== "All") query.category = category;

    const notes = await Note.find(query)
      .select("-file -thumbnail.data")
      .populate("uploadedBy", "username")
      .lean();

    const normalizedNotes = notes.map((noteObj) => {
      noteObj.hasThumbnail = Boolean(noteObj.thumbnail?.contentType);
      return noteObj;
    });
    res.status(200).json(normalizedNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload new note
const uploadNote = async (req, res) => {
  try {
    if (!req.files?.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file[0];
    const thumbnailFile = req.files.thumbnail?.[0];

    const noteData = {
      title: req.body.title,
      category: req.body.category,
      subject: req.body.subject || req.body.category,
      file: {
        data: file.buffer,
        contentType: file.mimetype,
        originalName: file.originalname,
        size: file.size,
      },
      uploadedBy: req.user.id,
      isGeneralNote: true, // All notes are now general category notes
    };

    if (thumbnailFile) {
      noteData.thumbnail = {
        data: thumbnailFile.buffer,
        contentType: thumbnailFile.mimetype,
        originalName: thumbnailFile.originalname,
        size: thumbnailFile.size,
      };
    }

    const note = await Note.create(noteData);
    console.log("Note created successfully with ID:", note._id);
    res.status(201).json(note);
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "Failed to upload note. Please try again." });
  }
};

// Get thumbnail image for note
const getNoteThumbnail = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).select("thumbnail");
    if (!note?.thumbnail?.data) {
      return res.status(404).json({ message: "Thumbnail not found" });
    }

    res.setHeader("Content-Type", note.thumbnail.contentType || "image/png");
    res.send(note.thumbnail.data);
  } catch (error) {
    console.error("Thumbnail fetch error:", error);
    res.status(500).json({ message: "Failed to fetch thumbnail." });
  }
};

// Download note file
const downloadNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || !note.file?.data) {
      return res.status(404).json({ message: "Note or file not found" });
    }

    res.setHeader("Content-Type", note.file.contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${note.file.originalName}"`,
    );

    res.send(note.file.data);
  } catch (error) {
    console.error("Download error:", error);
    res
      .status(500)
      .json({ message: "Failed to download note. Please try again." });
  }
};

// Preview note file
const previewNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || !note.file?.data) {
      return res.status(404).json({ message: "Note or file not found" });
    }

    res.setHeader("Content-Type", note.file.contentType);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${note.file.originalName}"`,
    );

    res.send(note.file.data);
  } catch (error) {
    console.error("Preview error:", error);
    res
      .status(500)
      .json({ message: "Failed to preview note. Please try again." });
  }
};

// Delete note (admin only)
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete note. Please try again." });
  }
};

module.exports = {
  upload: handleUpload,
  getNotes,
  uploadNote,
  getNoteThumbnail,
  downloadNote,
  previewNote,
  deleteNote,
};
