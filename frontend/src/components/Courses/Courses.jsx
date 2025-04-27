import React, { useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const courses = {
    "Computer Science": {
      description: "Bachelor of Computer Science",
      semesters: 8,
      subjects: [
        "Programming Fundamentals",
        "Data Structures",
        "Database Management",
        "Operating Systems",
        "Web Development",
      ],
    },
    "Information Technology": {
      description: "Bachelor of Information Technology",
      semesters: 8,
      subjects: [
        "IT Fundamentals",
        "Networking",
        "System Administration",
        "Cloud Computing",
        "Cybersecurity",
      ],
    },
    "Mechanical Engineering": {
      description: "Bachelor of Mechanical Engineering",
      semesters: 8,
      subjects: [
        "Engineering Mathematics",
        "Thermodynamics",
        "Machine Design",
        "Fluid Mechanics",
        "CAD/CAM",
      ],
    },
    // Add more courses as needed
  };

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 mb-8">
          University Courses
        </h1>

        {/* Course Selection */}
        {!selectedCourse ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(courses).map(([courseName, courseData]) => (
              <div
                key={courseName}
                className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition duration-200"
                onClick={() => setSelectedCourse(courseName)}
              >
                <h2 className="text-xl font-bold text-white mb-3">
                  {courseName}
                </h2>
                <p className="text-gray-400 mb-4">{courseData.description}</p>
                <div className="text-purple-400">
                  {courseData.semesters} Semesters •{" "}
                  {courseData.subjects.length} Subjects
                </div>
              </div>
            ))}
          </div>
        ) : !selectedSemester ? (
          /* Semester Selection */
          <div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="mb-6 text-purple-400 hover:text-purple-300"
            >
              ← Back to Courses
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedCourse}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(courses[selectedCourse].semesters)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition duration-200 text-center"
                  onClick={() => setSelectedSemester(index + 1)}
                >
                  <h3 className="text-xl font-bold text-white">
                    Semester {index + 1}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Subject List */
          <div>
            <button
              onClick={() => setSelectedSemester(null)}
              className="mb-6 text-purple-400 hover:text-purple-300"
            >
              ← Back to Semesters
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">
              {selectedCourse}
            </h2>
            <h3 className="text-xl text-purple-400 mb-6">
              Semester {selectedSemester}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses[selectedCourse].subjects.map((subject, index) => (
                <Link
                  key={index}
                  to={`/notes?course=${selectedCourse}&semester=${selectedSemester}&subject=${subject}`}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-200"
                >
                  <h4 className="text-lg font-bold text-white mb-2">
                    {subject}
                  </h4>
                  <p className="text-gray-400">View Notes →</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
