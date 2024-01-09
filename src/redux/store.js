import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import emailRegisterReducer from "./emailSlice"; // Agrega la importación del nuevo slice

export const store = configureStore({
  reducer: {
    user: userReducer,
    email: emailRegisterReducer, // Agrega el nuevo slice a la configuración
  },
});
