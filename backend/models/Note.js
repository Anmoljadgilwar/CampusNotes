const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: String,
    subject: String,
    course: String,
    semester: String,
    isGeneralNote: {
      type: Boolean,
      default: false,
    },
    file: {
      data: Buffer,
      contentType: String,
      originalName: String,
      size: Number,
    },
    thumbnail: {
      type: String,
      default: "/uploads/thumbnails/CNotes-Logo.png",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
