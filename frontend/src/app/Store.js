import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/ThemeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
