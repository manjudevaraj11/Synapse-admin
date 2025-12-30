import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import rolesReducer from "../features/roles/rolesSlice";
import permissionsReducer from "../features/permissions/permissionsSlice";
import frameworksSliceReducer from "../features/frameworks/frameworksSlice";
import organisationsSliceReducer from "../features/organisations/organisationsSlice";
import organisationFrameworksSliceReducer from "../features/organisationFrameworks/organisationFrameworksSlice";
import frameworkStagesSliceReducer from "../features/frameworkStages/frameworkStagesSlice";
import frameworkGroupsSliceReducer from "../features/frameworkGroups/frameworkGroupsSlice";
import frameworkControlsReducer from "@/features/frameworkControls/frameworkControlsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    frameworks: frameworksSliceReducer,
    organisations: organisationsSliceReducer,
    organisationFrameworks: organisationFrameworksSliceReducer,
    frameworkStages: frameworkStagesSliceReducer,
    frameworkGroups: frameworkGroupsSliceReducer,
    frameworkControls: frameworkControlsReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
