const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Local disk storage for thumbnails
const thumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads/thumbnails");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

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

    // If there's a thumbnail file, save it to disk
    if (req.files && req.files.thumbnail) {
      const thumbnailFile = req.files.thumbnail[0];
      const thumbnailDir = path.join(__dirname, "../uploads/thumbnails");

      if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir, { recursive: true });
      }

      const uniqueName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(thumbnailFile.originalname);
      const thumbnailPath = path.join(thumbnailDir, uniqueName);

      // Write the thumbnail buffer to disk
      fs.writeFileSync(thumbnailPath, thumbnailFile.buffer);

      // Update the file object with the disk path
      thumbnailFile.filename = uniqueName;
      thumbnailFile.path = thumbnailPath;
    }

    next();
  });
};

module.exports = handleUpload;
