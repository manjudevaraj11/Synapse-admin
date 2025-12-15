import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import rolesReducer from "../features/roles/rolesSlice";
import permissionsReducer from "../features/permissions/permissionsSlice";
import frameworksSliceReducer from "../features/frameworks/frameworksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    frameworks: frameworksSliceReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
