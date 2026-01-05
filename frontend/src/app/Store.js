import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/ThemeSlice";
import authReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});
