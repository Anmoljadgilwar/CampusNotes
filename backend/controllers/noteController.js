const Note = require("../models/Note");

// Import the upload configuration that handles different storage for files and thumbnails
const handleUpload = require("../config/uploadConfig");

const canManageNote = (note, user) => {
  if (!note || !user) return false;
  return user.isAdmin || note.uploadedBy.toString() === user.id;
};

// Get all notes (optionally by category)
const getNotes = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== "All") query.category = category;

    const notes = await Note.find(query)
      .select("-file -thumbnail.data")
      .populate("uploadedBy", "username")
      .sort({ isPinned: -1, pinnedAt: -1, createdAt: -1 })
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
      description: req.body.description || "",
      category: req.body.category,
      subject: req.body.subject || req.body.category,
      course: req.body.course || "",
      semester: req.body.semester || "",
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

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .select("-file.data -thumbnail.data")
      .populate("uploadedBy", "username")
      .lean();

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.hasThumbnail = Boolean(note.thumbnail?.contentType);
    res.status(200).json(note);
  } catch (error) {
    console.error("Fetch note error:", error);
    res.status(500).json({ message: "Failed to fetch note details." });
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

const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (!canManageNote(note, req.user)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit this note" });
    }

    const { title, description, category, subject, course, semester } = req.body;

    if (title !== undefined) note.title = title;
    if (description !== undefined) note.description = description;
    if (category !== undefined) note.category = category;
    if (subject !== undefined) note.subject = subject || category || note.category;
    if (course !== undefined) note.course = course;
    if (semester !== undefined) note.semester = semester;

    const file = req.files?.file?.[0];
    if (file) {
      note.file = {
        data: file.buffer,
        contentType: file.mimetype,
        originalName: file.originalname,
        size: file.size,
      };
    }

    if (req.body.removeThumbnail === "true") {
      note.thumbnail = undefined;
    }

    const thumbnailFile = req.files?.thumbnail?.[0];
    if (thumbnailFile) {
      note.thumbnail = {
        data: thumbnailFile.buffer,
        contentType: thumbnailFile.mimetype,
        originalName: thumbnailFile.originalname,
        size: thumbnailFile.size,
      };
    }

    await note.save();

    const updatedNote = await Note.findById(note._id)
      .select("-file -thumbnail.data")
      .populate("uploadedBy", "username")
      .lean();

    updatedNote.hasThumbnail = Boolean(updatedNote.thumbnail?.contentType);
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update note. Please try again." });
  }
};

const togglePinNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (!canManageNote(note, req.user)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to pin this note" });
    }

    note.isPinned = !note.isPinned;
    note.pinnedAt = note.isPinned ? new Date() : null;
    await note.save();

    res.status(200).json({
      message: note.isPinned ? "Note pinned successfully" : "Note unpinned successfully",
      isPinned: note.isPinned,
    });
  } catch (error) {
    console.error("Pin toggle error:", error);
    res.status(500).json({ message: "Failed to update note pin status." });
  }
};

// Delete note (owner or admin)
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (!canManageNote(note, req.user)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this note" });
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
  getNoteById,
  getNoteThumbnail,
  downloadNote,
  previewNote,
  updateNote,
  togglePinNote,
  deleteNote,
};
