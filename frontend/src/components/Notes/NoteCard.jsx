import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBookmark,
  FiDownload,
  FiEdit3,
  FiEye,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

const NoteCard = ({
  note,
  canManage,
  onDelete,
  onEdit,
  onTogglePin,
  deleting,
  pinning,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fallbackThumbnail = "/default.png";

  const handleUserClick = (e) => {
    e.stopPropagation();
    if (note.uploadedBy?._id) {
      navigate(`/profile/${note.uploadedBy._id}`);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setError("");
      const token = localStorage.getItem("token");

      const response = await fetch(`${backendUrl}/api/notes/download/${note._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        const contentType = response.headers.get("content-type");
        let fileExt = ".pdf";
        if (
          contentType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          fileExt = ".docx";
        }

        link.download = `${note.title}${fileExt}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to download note");
      }
    } catch (err) {
      console.error("Download error:", err);
      setError("Error downloading note");
    } finally {
      setDownloading(false);
    }
  };

  const handlePreview = async () => {
    try {
      setPreviewing(true);
      setError("");
      const token = localStorage.getItem("token");

      const response = await fetch(`${backendUrl}/api/notes/preview/${note._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to preview note");
        return;
      }

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("wordprocessingml.document")) {
        setError("DOCX preview is not supported in browser. Please download it instead.");
        return;
      }

      const blob = await response.blob();
      const previewUrl = window.URL.createObjectURL(blob);
      const previewWindow = window.open(previewUrl, "_blank", "noopener,noreferrer");
      if (!previewWindow) {
        setError("Popup blocked. Please allow popups for preview.");
      }
      setTimeout(() => window.URL.revokeObjectURL(previewUrl), 60000);
    } catch (err) {
      console.error("Preview error:", err);
      setError("Error previewing note");
    } finally {
      setPreviewing(false);
    }
  };

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_25px_70px_-30px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-slate-900">
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={
            imageError
              ? fallbackThumbnail
              : note.hasThumbnail
                ? `${backendUrl}/api/notes/thumbnail/${note._id}`
                : fallbackThumbnail
          }
          alt={note.title}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur dark:bg-slate-900/80 dark:text-slate-200">
            {note.category}
          </span>
          {note.isPinned && (
            <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-slate-900">
              Pinned
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {note.title}
          </h3>
          {note.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {note.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500 dark:text-slate-300">
          {note.course && (
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
              {note.course}
            </span>
          )}
          {note.semester && (
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
              Semester {note.semester}
            </span>
          )}
        </div>

        {note.uploadedBy && (
          <button
            onClick={handleUserClick}
            className="flex items-center gap-2 text-sm text-amber-700 transition hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
          >
            <FiUser />
            {note.uploadedBy.username || "Unknown"}
          </button>
        )}

        {error && <p className="text-sm text-rose-500">{error}</p>}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handlePreview}
            disabled={previewing || downloading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            <FiEye />
            {previewing ? "Opening..." : "Preview"}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading || previewing}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiDownload />
            {downloading ? "Saving..." : "Download"}
          </button>
        </div>

        {canManage && (
          <div className="grid grid-cols-3 gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
            <button
              onClick={() => onTogglePin(note._id)}
              disabled={pinning}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-amber-300 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200"
            >
              <FiBookmark />
              {pinning ? "..." : note.isPinned ? "Unpin" : "Pin"}
            </button>
            <button
              onClick={() => onEdit(note._id)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200"
            >
              <FiEdit3 />
              Edit
            </button>
            <button
              onClick={() => onDelete(note._id)}
              disabled={deleting}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-400/30 dark:text-rose-300 dark:hover:bg-rose-950/40"
            >
              <FiTrash2 />
              {deleting ? "..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default NoteCard;
