require("dotenv").config(); // Load env variables
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const path = require("path");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/users");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For JSON body parsing
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Something went wrong!" });
});

// Basic route to test server
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(`Port ${port} is busy, trying ${port + 1}`);
    server.listen(port + 1);
  } else {
    console.error("Server error:", error);
  }
});

// Handle process termination
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server terminated");
  });
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server terminated");
    process.exit(0);
  });
});
