import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UploadNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "HTML",
    course: "",
    semester: "",
    subject: "",
    isGeneralNote: false,
  });
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const courseData = {
    BCA: {
      subjects: {
        1: ["C Programming", "Digital Electronics", "Mathematics", "English"],
        2: ["C++", "Data Structures", "DBMS", "Operating Systems"],
        3: ["Java", "Python", "Web Development", "Computer Networks"],
        4: ["SQL", "Software Engineering", "Computer Architecture", "Android"],
        5: ["React", "Node.js", "Cloud Computing", "Cyber Security"],
        6: ["Project Work", "Machine Learning", "Data Science"],
      },
    },
    MCA: {
      subjects: {
        1: ["Advanced Java", "Advanced Python", "Data Mining", "AI"],
        2: ["Full Stack Development", "Big Data", "IoT", "Blockchain"],
        3: ["Cloud Architecture", "DevOps", "System Design", "ML Ops"],
        4: ["Project Work", "Research Methodology"],
      },
    },
    BTech: {
      subjects: {
        1: [
          "Engineering Mathematics",
          "Physics",
          "Chemistry",
          "Basic Electronics",
        ],
        2: ["C Programming", "Digital Logic", "Engineering Drawing", "English"],
        3: [
          "Data Structures",
          "OOPS",
          "Computer Architecture",
          "Database Systems",
        ],
        4: [
          "Operating Systems",
          "Computer Networks",
          "Theory of Computation",
          "Java",
        ],
        5: ["Software Engineering", "Web Technologies", "AI", "Python"],
        6: [
          "Cloud Computing",
          "Machine Learning",
          "Cyber Security",
          "Mobile Development",
        ],
        7: ["Distributed Systems", "Big Data", "IoT", "Blockchain"],
        8: ["Project Work", "Professional Ethics"],
      },
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.isAdmin);
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      subject: "",
    }));
  }, [formData.course, formData.semester]);

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

      if (formData.isGeneralNote) {
        formDataToSend.append("category", formData.category);
        formDataToSend.append("subject", formData.category);
      } else {
        formDataToSend.append("category", formData.subject);
        formDataToSend.append("subject", formData.subject);
        formDataToSend.append("course", formData.course);
        formDataToSend.append("semester", formData.semester);
      }

      formDataToSend.append("isGeneralNote", formData.isGeneralNote);
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-center text-white">
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  const getAvailableSubjects = () => {
    if (
      formData.course &&
      formData.semester &&
      courseData[formData.course]?.subjects[formData.semester]
    ) {
      return courseData[formData.course].subjects[formData.semester];
    }
    return [];
  };

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
            <label className="block text-white mb-2">Type of Note</label>
            <div className="flex space-x-4">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="isGeneralNote"
                  checked={formData.isGeneralNote}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, isGeneralNote: true }))
                  }
                  className="mr-2"
                />
                General Category Note
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="isGeneralNote"
                  checked={!formData.isGeneralNote}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, isGeneralNote: false }))
                  }
                  className="mr-2"
                />
                University Note
              </label>
            </div>
          </div>

          {formData.isGeneralNote && (
            <div className="mb-4">
              <label className="block text-white mb-2">Category</label>
              <select
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                value={formData.category}
                onChange={handleChange}
                name="category"
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
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!formData.isGeneralNote && (
            <>
              <div className="mb-4">
                <label className="block text-white mb-2">Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                  required
                >
                  <option value="">Select Course</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="BTech">BTech</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Semester</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                  required
                  disabled={!formData.course}
                >
                  <option value="">Select Semester</option>
                  {formData.course &&
                    Object.keys(
                      courseData[formData.course]?.subjects || {}
                    ).map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                  required
                  disabled={!formData.course || !formData.semester}
                >
                  <option value="">Select Subject</option>
                  {getAvailableSubjects().map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

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
