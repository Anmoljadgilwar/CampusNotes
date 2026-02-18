import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note }) => {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fallbackThumbnail = `${backendUrl}/uploads/thumbnails/CNotes-Logo.png`;

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

      const response = await fetch(
        `${backendUrl}/api/notes/download/${note._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Get the file extension from the content type
        const contentType = response.headers.get("content-type");
        let fileExt = ".pdf"; // default to pdf
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
        window.URL.revokeObjectURL(url); // Clean up the URL object
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
      <div className="h-40 bg-gray-100 dark:bg-gray-700 relative">
        <img
          src={
            imageError
              ? fallbackThumbnail
              : `${backendUrl}${
                  note.thumbnail || "/uploads/thumbnails/CNotes-Logo.png"
                }`
          }
          alt={note.title}
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
        />

        <div className="absolute top-2 right-2">
          <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-md">
            {note.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          {note.title}
        </h3>

        <div className="space-y-1 mb-3">
          {note.course && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <span className="font-medium">Course:</span> {note.course}
            </p>
          )}

          {note.semester && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <span className="font-medium">Semester:</span> {note.semester}
            </p>
          )}

          {note.uploadedBy && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <span className="font-medium">Uploaded by:</span>{" "}
              <button
                onClick={handleUserClick}
                className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 underline cursor-pointer"
              >
                {note.uploadedBy.username || "Unknown"}
              </button>
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 disabled:bg-gray-500 transition duration-200"
        >
          {downloading ? "Downloading..." : "Download"}
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
