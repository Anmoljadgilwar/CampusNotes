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
    <div className="bg-gray-800 text-purple-300 p-3">
      <div className="flex space-x-4 overflow-x-auto whitespace-nowrap px-4 -ml-4 -mr-4 md:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`hover:text-white px-4 py-1.5 rounded-lg transition bg-gray-700 hover:bg-gray-600 flex-shrink-0 ${
              activeCategory === cat
                ? "bg-purple-500 text-white"
                : "hover:text-white"
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
