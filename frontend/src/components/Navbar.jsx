import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ThemeToggle from "../features/theme/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.isAdmin);
        setUsername(decoded.username || "");
        setUserId(decoded.id || "");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    setUsername("");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-purple-400" : "";
  };

  return (
    <nav className="bg-purple-100  dark:bg-gray-900 text-purple-700 dark:text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16 ">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold  dark:text-purple-500 hover:text-purple-600 transition duration-300">
              CampusNotes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link
              to="/"
              className={`hover:text-purple-400 transition duration-300 ${isActive(
                "/"
              )}`}
            >
              Home
            </Link>

            {/* Only show Notes links if authenticated */}
            {localStorage.getItem("token") && (
              <Link
                to="/notes"
                className={`hover:text-purple-400 transition duration-300 ${isActive(
                  "/notes"
                )}`}
              >
                Notes
              </Link>
            )}

            <Link
              to="/about"
              className={`hover:text-purple-400 transition duration-300 ${isActive(
                "/about"
              )}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`hover:text-purple-400 transition duration-300 ${isActive(
                "/contact"
              )}`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {localStorage.getItem("token") ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/upload"
                  className="text-sm bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition duration-300 text-white"
                >
                  Upload Note
                </Link>
                {userId && (
                  <Link
                    to={`/profile/${userId}`}
                    className="dark:text-gray-300 text-black hover:text-purple-400 transition duration-300"
                  >
                    {/* <span className="text-2xl">👨‍💻</span> */}
                    {username}
                  </Link>
                )}
                {!userId && <span className="text-gray-300">{username}</span>}
                <Button
                  className="text-gray-800 bg-gray-900  border-1 border-purple-800 hover:bg-red-600 transition duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  className="bg-gray-900 border-1 border-purple-700 hover:bg-purple-600 transition duration-300"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 transition duration-300"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-200 dark:bg-gray-800 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-400 transition duration-300"
              onClick={toggleMenu}
            >
              Home
            </Link>

            {/* Only show Notes links if authenticated */}
            {localStorage.getItem("token") && (
              <Link
                to="/notes"
                className="block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-400 transition duration-300"
                onClick={toggleMenu}
              >
                Notes
              </Link>
            )}

            <Link
              to="/about"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-400 transition duration-300"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-400 transition duration-300"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            {/* Theme Toggle in Mobile */}
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>

            {localStorage.getItem("token") ? (
              <>
                <Link
                  to="/upload"
                  className="block px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white transition duration-300"
                  onClick={toggleMenu}
                >
                  Upload Note
                </Link>
                {userId ? (
                  <Link
                    to={`/profile/${userId}`}
                    className="block px-3 py-2 text-black dark:text-gray-300 hover:text-purple-400 transition duration-300"
                    onClick={toggleMenu}
                  >
                    <span className="text-2xl">👨‍💻</span> {username}
                  </Link>
                ) : (
                  <div className="px-3 py-2 text-gray-300">{username}</div>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md dark:bg-gray-700  bg-purple-300 hover:bg-red-600 text-black dark:text-white transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white transition duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition duration-300"
                  onClick={toggleMenu}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
