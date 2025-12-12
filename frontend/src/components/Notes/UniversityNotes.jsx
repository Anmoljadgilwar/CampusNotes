import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "./NoteCard";
import { FiSearch } from "react-icons/fi";

const UniversityNotes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    course: "",
    semester: "",
    subject: "",
  });
  const navigate = useNavigate();

  // Course data structure
  const courseData = {
    BCA: {
      semesters: 6,
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
      semesters: 4,
      subjects: {
        1: ["Advanced Java", "Advanced Python", "Data Mining", "AI"],
        2: ["Full Stack Development", "Big Data", "IoT", "Blockchain"],
        3: ["Cloud Architecture", "DevOps", "System Design", "ML Ops"],
        4: ["Project Work", "Research Methodology"],
      },
    },
    BTech: {
      semesters: 8,
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
    fetchNotes();
  }, [filters]);

  // New effect for search and filtering
  useEffect(() => {
    filterNotes();
  }, [searchQuery, notes]);

  const fetchNotes = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      let url = backendUrl + "/api/notes?";
      if (filters.course) url += `course=${filters.course}&`;
      if (filters.semester) url += `semester=${filters.semester}&`;
      if (filters.subject) url += `subject=${filters.subject}&`;

      const response = await fetch(url);
      const data = await response.json();
      setNotes(data);
      setFilteredNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // New function to handle search and filtering
  const filterNotes = () => {
    if (!searchQuery) {
      setFilteredNotes(notes);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = notes.filter((note) => {
      // Add null checks for each property
      return (
        (note.title?.toLowerCase() || "").includes(query) ||
        (note.course?.toLowerCase() || "").includes(query) ||
        (note.subject?.toLowerCase() || "").includes(query) ||
        (note.category?.toLowerCase() || "").includes(query)
      );
    });
    setFilteredNotes(filtered);
  };

  // Add debounce to search
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [filterType]: value };
      // Reset dependent filters
      if (filterType === "course") {
        newFilters.semester = "";
        newFilters.subject = "";
      }
      if (filterType === "semester") {
        newFilters.subject = "";
      }
      return newFilters;
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-purple-400">
            University Notes
          </h1>
          {localStorage.getItem("isAdmin") === "true" && (
            <button
              onClick={() => navigate("/upload")}
              className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-white"
            >
              Upload Note
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <FiSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search notes by title, course, subject..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Course Filter */}
            <div>
              <label className="block text-gray-900 dark:text-white mb-2">
                Course
              </label>
              <select
                value={filters.course}
                onChange={(e) => handleFilterChange("course", e.target.value)}
                className="w-full p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
              >
                <option value="">All Courses</option>
                {Object.keys(courseData).map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester Filter */}
            <div>
              <label className="block text-gray-900 dark:text-white mb-2">
                Semester
              </label>
              <select
                value={filters.semester}
                onChange={(e) => handleFilterChange("semester", e.target.value)}
                className="w-full p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                disabled={!filters.course}
              >
                <option value="">All Semesters</option>
                {filters.course &&
                  [...Array(courseData[filters.course].semesters)].map(
                    (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Semester {i + 1}
                      </option>
                    )
                  )}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-gray-900 dark:text-white mb-2">
                Subject
              </label>
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange("subject", e.target.value)}
                className="w-full p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                disabled={!filters.course || !filters.semester}
              >
                <option value="">All Subjects</option>
                {filters.course &&
                  filters.semester &&
                  courseData[filters.course].subjects[filters.semester].map(
                    (subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    )
                  )}
              </select>
            </div>
          </div>
        </div>

        {/* Search Results Summary */}
        {searchQuery && (
          <div className="mb-6 text-gray-600 dark:text-gray-400">
            Found {filteredNotes.length} results for "{searchQuery}"
          </div>
        )}

        {/* Active Filters Display */}
        {(filters.course || filters.semester || filters.subject) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.course && (
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                {filters.course}
                <button
                  onClick={() => handleFilterChange("course", "")}
                  className="ml-2 hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            )}
            {filters.semester && (
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                Semester {filters.semester}
                <button
                  onClick={() => handleFilterChange("semester", "")}
                  className="ml-2 hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            )}
            {filters.subject && (
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                {filters.subject}
                <button
                  onClick={() => handleFilterChange("subject", "")}
                  className="ml-2 hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Notes Grid */}
        {loading ? (
          <div className="text-center text-gray-900 dark:text-white">
            Loading...
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            <p className="text-xl">No notes found.</p>
            <p className="mt-2">
              {searchQuery
                ? "Try adjusting your search terms."
                : "Try adjusting your filters or check back later."}
            </p>
          </div>
        )}

        {/* Quick Scroll To Top Button */}
        {filteredNotes.length > 12 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default UniversityNotes;
