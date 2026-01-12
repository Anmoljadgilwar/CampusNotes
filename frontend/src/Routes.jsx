import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Notes from "./components/Notes/Notes";
import UploadNote from "./components/Notes/UploadNote";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import About from "./components/About";
import Contact from "./components/Contact";
import UserProfile from "./components/Profile/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadNote />
          </ProtectedRoute>
        }
      />
      <Route path="/profile/:id" element={<UserProfile />} />
    </Routes>
  );
};

export default AppRoutes;
