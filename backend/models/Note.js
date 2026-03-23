const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
    },
    semester: {
      type: String,
      trim: true,
    },
    file: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      originalName: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
    },
    thumbnail: {
      data: {
        type: Buffer,
      },
      contentType: {
        type: String,
      },
      originalName: {
        type: String,
      },
      size: {
        type: Number,
      },
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isGeneralNote: {
      type: Boolean,
      default: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    pinnedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);
