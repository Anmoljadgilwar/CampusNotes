import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NoteCard from "./NoteCard";
import Categories from "../Categories";
import { toast } from "react-toastify";

const Notes = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [searchQuery, setSearchQuery] = useState("");

  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [deletingNoteId, setDeletingNoteId] = useState(null);
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
  applyFilters();
}, [activeCategory, searchQuery, notes]);

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

  // Function to filter notes 
  const applyFilters = () => {
  const q = searchQuery.trim().toLowerCase();

  const byCategory =
    activeCategory === "All"
      ? notes
      : notes.filter((n) => n.category === activeCategory);

  const bySearch =
    q.length === 0
      ? byCategory
      : byCategory.filter((n) => {
          const title = (n.title || "").toLowerCase();
          const category = (n.category || "").toLowerCase();
          const uploader = (n.uploadedBy?.username || "").toLowerCase();
          return (
            title.includes(q) || category.includes(q) || uploader.includes(q)
          );
        });

  setFilteredNotes(bySearch);
};


  // Handle category change
  const handleCategoryChange = (category) => {
    //  console.log("Category changed to:", category);
    setActiveCategory(category);
  };

  // Handle delete note (admin only)
  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      setDeletingNoteId(noteId);
      const token = localStorage.getItem("token");
      const response = await fetch(`${backendUrl}/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Note deleted successfully");
        fetchNotes(); // Refresh the notes list
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete note");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting note");
    } finally {
      setDeletingNoteId(null);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-900 dark:text-white p-8">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Categories
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="p-8">
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-purple-400">
            Notes
          </h2>
          <button
            onClick={() => navigate("/upload")}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-white"
          >
            Upload Note
          </button>
         
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, category, or uploader..."
            className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        
        </div>

        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <div key={note._id} className="relative">
                <NoteCard note={note} />
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    disabled={deletingNoteId === note._id}
                    className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs disabled:bg-gray-400"
                    title="Delete note"
                  >
                    {deletingNoteId === note._id ? "Deleting..." : "×"}
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
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
