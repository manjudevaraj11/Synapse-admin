import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import rolesReducer from "../features/roles/rolesSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
