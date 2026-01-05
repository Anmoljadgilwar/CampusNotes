import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// 1️⃣ Get token from localStorage (on app start)
const token = localStorage.getItem("token");

// 2️⃣ Derive initial user from token
const initialState = {
  user: token ? { ...jwtDecode(token), token } : null,
};

// 3️⃣ Create auth slice
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      state.user = { ...decoded, token };
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
});

// 4️⃣ Export actions
export const { login, logout } = userSlice.actions;

// 5️⃣ Export reducer
export default userSlice.reducer;
