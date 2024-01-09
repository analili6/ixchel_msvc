import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  correo: "",
};

export const correoSlice = createSlice({
  name: "correo",
  initialState,
  reducers: {
    addCorreo: (state, action) => {
      const { correo } = action.payload;
      state.correo = correo;
    },
    changeCorreo: (state, action) => {
      state.correo = action.payload;
    },
  },
});

export const { addCorreo, changeCorreo } = correoSlice.actions;
export default correoSlice.reducer;
