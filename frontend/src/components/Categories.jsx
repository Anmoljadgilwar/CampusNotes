import React from "react";
import { noteCategories } from "./Notes/noteCategories";

const Categories = ({ activeCategory, onCategoryChange }) => {
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-3 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <div className="scrollbar-hide flex gap-3 overflow-x-auto whitespace-nowrap px-1 md:justify-center">
        {noteCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-slate-900 text-white shadow-sm dark:bg-amber-400 dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
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
