import React from "react";
import { Link } from "react-router-dom";
import { FiBook, FiDownload, FiUsers, FiBookOpen } from "react-icons/fi"; // Install react-icons if not already installed

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-600 to-purple-800 dark:from-purple-900 dark:to-gray-900 dark:text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to CampusNotes
            </h1>
            <p className="text-xl text-gray-100 dark:text-gray-300 mb-8">
              Your one-stop destination for university study materials
            </p>

            {isAuthenticated ? (
              <Link
                to="/university-notes"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
              >
                Browse Notes
              </Link>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <FiBook className="text-purple-400 text-4xl mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-2">
              Quality Notes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access high-quality study materials curated by top educators
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <FiDownload className="text-purple-400 text-4xl mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-2">
              Easy Download
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Download notes instantly with just one click
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <FiUsers className="text-purple-400 text-4xl mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-2">
              Free Access
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All study materials are completely free
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <FiBookOpen className="text-purple-400 text-4xl mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-2">
              Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Notes available for all major courses
            </p>
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Popular Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/university-notes?course=BCA"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              BCA
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Bachelor of Computer Applications
            </p>
          </Link>

          <Link
            to="/university-notes?course=MCA"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              MCA
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Master of Computer Applications
            </p>
          </Link>

          <Link
            to="/university-notes?course=BTech"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              BTech
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Bachelor of Technology
            </p>
          </Link>
        </div>
      </div>

      {/* CTA Section - Show different message based on auth status */}
      <div className="bg-purple-700 dark:bg-gray-800">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {isAuthenticated
              ? "Ready to Start Learning?"
              : "Join CampusNotes Today"}
          </h2>
          <p className="text-purple-100 dark:text-gray-400 mb-8">
            {isAuthenticated
              ? "Access notes and study materials for free."
              : "Sign up to access all our study materials and resources."}
          </p>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-800 dark:bg-gray-900 border-t border-purple-600 dark:border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-purple-100 dark:text-gray-400">
            <p>© 2025 CampusNotes. All rights reserved.</p>
            <div className="mt-4">
              <Link
                to="/about"
                className="hover:text-purple-300 dark:hover:text-purple-400 mx-2"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-purple-300 dark:hover:text-purple-400 mx-2"
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                className="hover:text-purple-300 dark:hover:text-purple-400 mx-2"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
