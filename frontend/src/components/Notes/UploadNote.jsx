import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UploadNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "HTML",
  });
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    e.preventDefault();
    setLoading(true);
    setError("");

    if (!file) {
      setError("Please select a file");
      setLoading(false);
      return;
    }

    // Check file size
    if (file.size > 8 * 1024 * 1024) {
      setError("File size must be less than 8MB");
      setLoading(false);
      return;
    }

    // Check file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      setError("Only PDF and DOCX files are allowed");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to upload files");
        navigate("/login");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("subject", formData.category);
      formDataToSend.append("isGeneralNote", "true");
      formDataToSend.append("file", file);
      if (thumbnail) {
        formDataToSend.append("thumbnail", thumbnail);
      }

      const response = await fetch(backendUrl + "/api/notes/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/notes");
      } else {
        if (response.status === 401) {
          setError("Your session has expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(data.message || "Upload failed");
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Allow all authenticated users to upload notes
  // Removed admin-only restriction

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-6">Upload Note</h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              value={formData.title}
              onChange={handleChange}
              name="title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Category</label>
            <select
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              value={formData.category}
              onChange={handleChange}
              name="category"
              required
            >
              {[
                "HTML",
                "CSS",
                "Javascript",
                "C",
                "C++",
                "JAVA",
                "PYTHON",
                "SQL",
                "REACT JS",
                "Other",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">
              Document File (PDF or DOCX)
            </label>
            <input
              type="file"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf,.docx"
              required
            />
            <p className="text-sm text-gray-400 mt-1">Maximum file size: 8MB</p>
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Thumbnail Image</label>
            <input
              type="file"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              onChange={handleThumbnailChange}
              accept="image/*"
            />
            {thumbnailPreview && (
              <div className="mt-2">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNote;
