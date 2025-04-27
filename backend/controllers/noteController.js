const Note = require("../models/Note");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const notesDir = path.join(__dirname, "../uploads/notes");
const thumbnailsDir = path.join(__dirname, "../uploads/thumbnails");
if (!fs.existsSync(notesDir)) fs.mkdirSync(notesDir, { recursive: true });
if (!fs.existsSync(thumbnailsDir))
  fs.mkdirSync(thumbnailsDir, { recursive: true });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Choose destination based on file type
    const dest = file.fieldname === "thumbnail" ? thumbnailsDir : notesDir;
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "file") {
      // For PDF and DOCX files
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only PDF and DOCX files are allowed for notes!"), false);
      }
    } else if (file.fieldname === "thumbnail") {
      // For thumbnail images
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed for thumbnails!"), false);
      }
    }
  },
  limits: {
    fileSize: 8 * 1024 * 1024, // 8MB limit
  },
}).fields([
  { name: "file", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

const getNotes = async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const notes = await Note.find(query).populate("uploadedBy", "username");
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadNote = async (req, res) => {
  try {
    console.log("Upload request received:", req.body);
    console.log("Files:", req.files);

    if (!req.files?.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file[0];
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message: "Invalid file type. Only PDF and DOCX files are allowed.",
      });
    }

    if (file.size > 8 * 1024 * 1024) {
      return res.status(400).json({ message: "File size exceeds 8MB limit" });
    }

    const noteData = {
      title: req.body.title,
      category: req.body.category,
      subject: req.body.subject || req.body.category,
      file: `/uploads/notes/${file.filename}`,
      thumbnail: req.files.thumbnail
        ? `/uploads/thumbnails/${req.files.thumbnail[0].filename}`
        : "/uploads/thumbnails/default.png",
      uploadedBy: req.user.id,
      isGeneralNote: req.body.isGeneralNote === "true",
    };

    // Only add course and semester if not a general note
    if (req.body.isGeneralNote !== "true") {
      if (req.body.course) noteData.course = req.body.course;
      if (req.body.semester) noteData.semester = req.body.semester;
    }

    const note = await Note.create(noteData);

    console.log("Note created:", note);
    res.status(201).json(note);
  } catch (error) {
    console.error("Upload error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid data provided" });
    }
    res
      .status(500)
      .json({ message: "Failed to upload note. Please try again." });
  }
};

const downloadNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const filePath = path.join(__dirname, "..", note.file);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Determine file type and set appropriate content type
    const fileExt = path.extname(filePath).toLowerCase();
    let contentType = "application/octet-stream";

    if (fileExt === ".pdf") {
      contentType = "application/pdf";
    } else if (fileExt === ".docx") {
      contentType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    // Set appropriate headers
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${note.title}${fileExt}"`
    );

    // Send the file
    res.sendFile(filePath);
  } catch (error) {
    console.error("Download error:", error);
    res
      .status(500)
      .json({ message: "Failed to download note. Please try again." });
  }
};

module.exports = {
  upload,
  getNotes,
  uploadNote,
  downloadNote,
};
