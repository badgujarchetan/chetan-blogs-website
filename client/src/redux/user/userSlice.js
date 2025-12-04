import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuserLoggedIn: (state, action) => {
      const payload = action.payload;
      state.isLoggedIn = true;
      state.user = payload;
    },
    setuserLogout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { setuserLoggedIn, setuserLogout } = userSlice.actions;

export default userSlice.reducer;
