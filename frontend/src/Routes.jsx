import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Notes from "./components/Notes/Notes";
import UploadNote from "./components/Notes/UploadNote";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
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
    </Routes>
  );
};

export default AppRoutes;
