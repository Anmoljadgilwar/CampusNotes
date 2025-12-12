import React from "react";

const Categories = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    "All",
    "HTML",
    "CSS",
    "Javascript",
    "C",
    "C++",
    "JAVA",
    "PYTHON",
    "SQL",
    "REACT JS",
  ];

  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category);
    onCategoryChange(category);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-purple-300 p-3">
      <div className="flex space-x-4 overflow-x-auto whitespace-nowrap px-4 -ml-4 -mr-4 md:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-1.5 rounded-lg transition flex-shrink-0 ${
              activeCategory === cat
                ? "bg-purple-500 text-white"
                : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
