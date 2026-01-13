import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./ThemeSlice";

const ThemeToggle = () => {
  // Read the current theme state from the store
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const isDark = theme === "dark";

  const handleToggle = () => {
    // Dispatch the action to change the theme state
    dispatch(toggleTheme());
  };

  return (
    <button
      className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-1 py-1 text-2xl rounded-full shadow-md transition-colors duration-200"
      onClick={handleToggle}
      type="button"
      aria-label="Toggle dark mode"
    >
      {/* Display icon based on current state */}
      {isDark ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
//     const root = document.documentElement;
//     const savedTheme = localStorage.getItem("theme");

//     let shouldBeDark = false;

//     if (savedTheme === "dark") {
//       shouldBeDark = true;
//     } else if (savedTheme === "light") {
//       shouldBeDark = false;
//     } else {
//       // Check system preference
//       shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     }

//     // Apply theme to DOM
//     if (shouldBeDark) {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }

//     setIsDark(shouldBeDark);
//     setMounted(true);
//   }, []);

//   const toggleTheme = () => {
//     const root = document.documentElement;
//     const newIsDark = !isDark;

//     // Update DOM immediately
//     if (newIsDark) {
//       root.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       root.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }

//     // Update state
//     setIsDark(newIsDark);
//   };

//   // Prevent hydration mismatch by not rendering until mounted
//   if (!mounted) {
//     return (
//       <button
//         className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full shadow-md transition-colors duration-200"
//         type="button"
//         aria-label="Toggle dark mode"
//         disabled
//       >
//         ☀️ Light
//       </button>
//     );
//   }

//   return (
//     <button
//       className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full shadow-md transition-colors duration-200"
//       onClick={toggleTheme}
//       type="button"
//       aria-label="Toggle dark mode"
//     >
//       {isDark ? "🌙 Dark" : "☀️ Light"}
//     </button>
//   );
// };

// export default ThemeToggle;
