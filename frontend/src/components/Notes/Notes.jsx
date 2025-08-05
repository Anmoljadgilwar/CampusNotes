import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NoteCard from "./NoteCard";
import Categories from "../Categories";
import { toast } from "react-toastify";

const Notes = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.isAdmin);
      console.log("User role:", decoded.isAdmin ? "Admin" : "User");
    }
    fetchNotes();
  }, []);

  // Add effect to filter notes when category changes
  useEffect(() => {
    if (notes.length > 0) {
      filterNotesByCategory();
    }
  }, [activeCategory, notes]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(backendUrl + "/api/notes");
      const data = await response.json();
      setNotes(data);
      setFilteredNotes(data); // Initialize with all notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to filter notes by category
  const filterNotesByCategory = () => {
    if (activeCategory === "All") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter((note) => note.category === activeCategory);
      setFilteredNotes(filtered);
    }
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    console.log("Category changed to:", category);
    setActiveCategory(category);
  };

  if (loading)
    return <div className="text-center text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900">
      <Categories
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-400">Notes</h2>
          {isAdmin && (
            <button
              onClick={() => navigate("/upload")}
              className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-white"
            >
              Upload Note
            </button>
          )}
        </div>

        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No notes found in this category.</p>
            <p className="mt-2">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
