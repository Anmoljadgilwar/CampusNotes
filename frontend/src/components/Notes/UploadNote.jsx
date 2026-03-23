import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiArrowLeft, FiSave, FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { noteCategories } from "./noteCategories";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded?.exp) return false;
    return decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

const initialFormState = {
  title: "",
  description: "",
  category: "HTML",
  course: "",
  semester: "",
};

const UploadNote = () => {
  const { id: noteId } = useParams();
  const isEditMode = Boolean(noteId);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [removeThumbnail, setRemoveThumbnail] = useState(false);
  const [existingFileName, setExistingFileName] = useState("");
  const [hasExistingThumbnail, setHasExistingThumbnail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingNote, setLoadingNote] = useState(isEditMode);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    if (isEditMode) {
      fetchNote(token);
    }
  }, [isEditMode, noteId, navigate]);

  const fetchNote = async (token) => {
    try {
      setLoadingNote(true);
      const response = await fetch(`${backendUrl}/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load note details");
      }

      setFormData({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "HTML",
        course: data.course || "",
        semester: data.semester || "",
      });
      setExistingFileName(data.file?.originalName || "");
      setHasExistingThumbnail(Boolean(data.hasThumbnail));
      setThumbnailPreview(
        data.hasThumbnail ? `${backendUrl}/api/notes/thumbnail/${data._id}` : null,
      );
    } catch (err) {
      console.error("Note fetch error:", err);
      setError(err.message || "Failed to load note");
    } finally {
      setLoadingNote(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateDocument = (selectedFile) => {
    if (!selectedFile) return "";
    if (selectedFile.size > 8 * 1024 * 1024) {
      return "File size must be less than 8MB";
    }

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      return "Only PDF and DOCX files are allowed";
    }

    return "";
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validationError = validateDocument(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setFile(selectedFile || null);
  };

  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setThumbnail(selectedFile);
    setRemoveThumbnail(false);
    setHasExistingThumbnail(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const clearThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    setHasExistingThumbnail(false);
    if (isEditMode) {
      setRemoveThumbnail(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isEditMode && !file) {
      setError("Please select a document file");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        setError("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("category", formData.category);
      formDataToSend.append("subject", formData.category);
      formDataToSend.append("course", formData.course.trim());
      formDataToSend.append("semester", formData.semester.trim());
      formDataToSend.append("isGeneralNote", "true");
      if (file) {
        formDataToSend.append("file", file);
      }
      if (thumbnail) {
        formDataToSend.append("thumbnail", thumbnail);
      }
      if (removeThumbnail) {
        formDataToSend.append("removeThumbnail", "true");
      }

      const endpoint = isEditMode
        ? `${backendUrl}/api/notes/${noteId}`
        : `${backendUrl}/api/notes/upload`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError("Your session has expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(data.message || "Unable to save note");
        return;
      }

      toast.success(isEditMode ? "Note updated successfully" : "Note created successfully");
      navigate("/notes");
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingNote) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-6 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          Loading note editor...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/notes")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          <FiArrowLeft />
          Back to notes
        </button>

        <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 shadow-[0_18px_70px_-40px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
          <div className="bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#f59e0b_180%)] px-6 py-8 text-white sm:px-8">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
              {isEditMode ? "Edit Note" : "Create Note"}
            </p>
            <h1 className="mt-3 text-3xl font-semibold">
              {isEditMode ? "Update your note details" : "Add a new note to your library"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
              Keep the title clear, add a short description, and upload a file your classmates or future self can use quickly.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 dark:border-rose-400/30 dark:bg-rose-950/40 dark:text-rose-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Title
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    value={formData.title}
                    onChange={handleChange}
                    name="title"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Category
                  </span>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    value={formData.category}
                    onChange={handleChange}
                    name="category"
                    required
                  >
                    {noteCategories.filter((category) => category !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Description
                </span>
                <textarea
                  className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  placeholder="Add a short summary, topics covered, or why this note is useful."
                />
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Course
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    value={formData.course}
                    onChange={handleChange}
                    name="course"
                    placeholder="e.g. Web Development"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Semester
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    value={formData.semester}
                    onChange={handleChange}
                    name="semester"
                    placeholder="e.g. 4"
                  />
                </label>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                    <FiUploadCloud className="text-xl" />
                    <div>
                      <p className="font-semibold">Document file</p>
                      <p className="text-sm text-slate-500 dark:text-slate-300">
                        Upload PDF or DOCX, up to 8MB.
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="mt-4 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    onChange={handleFileChange}
                    accept=".pdf,.docx"
                    required={!isEditMode}
                  />
                  {(file || existingFileName) && (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                      Current file: {file?.name || existingFileName}
                    </p>
                  )}
                </div>

                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Thumbnail image
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                    Optional, but helpful for a more visual notes board.
                  </p>
                  <input
                    type="file"
                    className="mt-4 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    onChange={handleThumbnailChange}
                    accept="image/*"
                  />

                  {thumbnailPreview && (
                    <div className="mt-4">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="h-40 w-full rounded-2xl object-cover"
                      />
                    </div>
                  )}

                  {hasExistingThumbnail && (
                    <button
                      type="button"
                      onClick={clearThumbnail}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-rose-600 transition hover:text-rose-700 dark:text-rose-300"
                    >
                      <FiX />
                      Remove thumbnail
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={loading}
                >
                  <FiSave />
                  {loading
                    ? isEditMode
                      ? "Saving changes..."
                      : "Creating note..."
                    : isEditMode
                      ? "Save changes"
                      : "Create note"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/notes")}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNote;
