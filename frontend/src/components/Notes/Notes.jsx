import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import NoteCard from "./NoteCard";
import Categories from "../Categories";

const Notes = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [pinningNoteId, setPinningNoteId] = useState(null);
  const [showMineOnly, setShowMineOnly] = useState(false);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(Boolean(decoded.isAdmin));
        setCurrentUserId(decoded.id || "");
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [activeCategory, searchQuery, notes, showMineOnly, showPinnedOnly]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/notes`);
      const data = await response.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Unable to load notes right now.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const q = searchQuery.trim().toLowerCase();

    const result = notes.filter((note) => {
      const matchesCategory =
        activeCategory === "All" || note.category === activeCategory;
      const matchesMine =
        !showMineOnly || note.uploadedBy?._id === currentUserId;
      const matchesPinned = !showPinnedOnly || note.isPinned;
      const matchesSearch =
        q.length === 0 ||
        [note.title, note.category, note.description, note.uploadedBy?.username]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(q));

      return matchesCategory && matchesMine && matchesPinned && matchesSearch;
    });

    setFilteredNotes(result);
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Delete this note permanently?")) {
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

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to delete note");
        return;
      }

      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting note");
    } finally {
      setDeletingNoteId(null);
    }
  };

  const handleTogglePin = async (noteId) => {
    try {
      setPinningNoteId(noteId);
      const token = localStorage.getItem("token");
      const response = await fetch(`${backendUrl}/api/notes/${noteId}/pin`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update note pin");
        return;
      }

      await fetchNotes();
      toast.success(data.message || "Note updated");
    } catch (error) {
      console.error("Pin error:", error);
      toast.error("Error updating note pin");
    } finally {
      setPinningNoteId(null);
    }
  };

  const myNotesCount = notes.filter(
    (note) => note.uploadedBy?._id === currentUserId,
  ).length;
  const pinnedCount = notes.filter((note) => note.isPinned).length;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-6 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          Loading notes...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#111827_0%,#1e293b_45%,#f59e0b_180%)] p-6 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.65)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                Notes Workspace
              </p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Create, organize, and revisit your notes in one clean place.
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-200 sm:text-base">
                Pin important resources, update note details anytime, and keep your study library easy to scan.
              </p>
            </div>

            <button
              onClick={() => navigate("/upload")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
            >
              <FiPlus />
              Create Note
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-slate-300">Total notes</p>
              <p className="mt-2 text-3xl font-semibold">{notes.length}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-slate-300">My notes</p>
              <p className="mt-2 text-3xl font-semibold">{myNotesCount}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-slate-300">Pinned</p>
              <p className="mt-2 text-3xl font-semibold">{pinnedCount}</p>
            </div>
          </div>
        </section>

        <Categories
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <section className="rounded-[28px] border border-slate-200/80 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-xl">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, category, description, or uploader..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-amber-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowMineOnly((prev) => !prev)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  showMineOnly
                    ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-900"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                My notes
              </button>
              <button
                onClick={() => setShowPinnedOnly((prev) => !prev)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  showPinnedOnly
                    ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-900"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Pinned
              </button>
            </div>
          </div>
        </section>

        {filteredNotes.length > 0 ? (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredNotes.map((note) => {
              const canManage =
                isAdmin || note.uploadedBy?._id === currentUserId;

              return (
                <NoteCard
                  key={note._id}
                  note={note}
                  canManage={canManage}
                  onDelete={handleDeleteNote}
                  onEdit={(noteId) => navigate(`/notes/${noteId}/edit`)}
                  onTogglePin={handleTogglePin}
                  deleting={deletingNoteId === note._id}
                  pinning={pinningNoteId === note._id}
                />
              );
            })}
          </section>
        ) : (
          <section className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 px-6 py-14 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              No notes match these filters
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Try another category, clear a filter, or create a fresh note.
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
            >
              <FiPlus />
              Create Note
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default Notes;
