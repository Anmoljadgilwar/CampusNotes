const multer = require("multer");

// Memory storage for note files (to store in MongoDB)
const memoryStorage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "file") {
    // Allow only PDF and DOCX files for notes
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
    // Allow only image files for thumbnails
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for thumbnails!"), false);
    }
  } else {
    cb(new Error("Unexpected field"), false);
  }
};

// Create separate multer instances for different file types
const upload = multer({
  storage: memoryStorage, // Default to memory storage
  fileFilter: fileFilter,
  limits: {
    fileSize: 8 * 1024 * 1024, // 8MB limit
    files: 2, // Maximum 2 files (file + thumbnail)
  },
}).fields([
  { name: "file", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

// Custom middleware to handle different storage for thumbnails
const handleUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    next();
  });
};

module.exports = handleUpload;
