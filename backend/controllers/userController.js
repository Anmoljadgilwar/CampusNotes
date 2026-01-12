const mongoose = require("mongoose");
const User = require("../models/User");
const Note = require("../models/Note");

// Get user profile by ID (public - anyone can view)
const getUserProfile = async (req, res) => {
  try {
    // Validate ObjectId to avoid cast errors
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get notes uploaded by this user
    const notes = await Note.find({ uploadedBy: req.params.id })
      .select("title category course semester thumbnail createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      },
      notes: notes,
      notesCount: notes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile };
