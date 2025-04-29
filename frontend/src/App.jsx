import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Notes from "./components/Notes/Notes";
import UniversityNotes from "./components/Notes/UniversityNotes";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadNote from "./components/Notes/UploadNote";
import Contact from "./components/Contact";
import About from "./components/About";
// import Courses from "./components/Courses/Courses";
import Home from "./components/Home";

const App = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showNotes, setShowNotes] = useState(false);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setShowNotes(true);
  };

  const handleHomeClick = () => {
    setShowNotes(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
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
                path="/university-notes"
                element={
                  <ProtectedRoute>
                    <UniversityNotes />
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
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/courses" element={<Courses />} /> */}
            </Routes>
          </main>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
