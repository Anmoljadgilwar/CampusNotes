// import React, { useEffect } from "react";
// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./Routes";
// import Navbar from "./components/Navbar";
// import { AuthProvider } from "./context/AuthContext";
// import { useSelector } from "react-redux";
// const App = () => {
//   const theme = useSelector((state) => state.theme.theme);
//   const isDark = theme === "dark";
//   useLayoutEffect(() => {
//   const root = document.documentElement;

//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <div className={isDark ? "dark" : ""}>
//           <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
//             <Navbar />
//             <main>
//               <AppRoutes />
//             </main>
//           </div>
//         </div>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// };

// export default App;
import React, { useLayoutEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import Navbar from "./components/Navbar";

import { useSelector } from "react-redux";

const App = () => {
  const theme = useSelector((state) => state.theme.theme);

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
