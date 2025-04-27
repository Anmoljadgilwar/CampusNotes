const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
    semester: {
      type: String,
      required: false,
    },
    file: {
      type: String,
      required: true,
      description: "Path to the uploaded document file (PDF or DOCX)",
    },
    thumbnail: {
      type: String,
      default: "/uploads/thumbnails/default.png",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isGeneralNote: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
