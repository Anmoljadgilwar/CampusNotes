import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NoteCard from "../Notes/NoteCard";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/users/${id}`);
      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setNotes(data.notes || []);
      } else {
        setError(data.message || "Failed to load user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Error loading user profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-900 dark:text-white">
          <p className="text-xl">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-900 dark:text-white">
          <p className="text-xl text-red-500">{error || "User not found"}</p>
          <button
            onClick={() => navigate("/notes")}
            className="mt-4 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-white"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.username}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              {user.isAdmin && (
                <span className="inline-block mt-2 bg-purple-500 text-white px-3 py-1 rounded text-sm">
                  Admin
                </span>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              Member since:{" "}
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Notes Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-purple-400 mb-4">
            Uploaded Notes ({notes.length})
          </h2>
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400 py-12 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-xl">No notes uploaded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
