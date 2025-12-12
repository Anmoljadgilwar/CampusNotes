import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { useSelector } from "react-redux";
const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className={isDark ? "dark" : ""}>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
