import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addEmail: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { addEmail, changeEmail } = userSlice.actions;
export default userSlice.reducer;
