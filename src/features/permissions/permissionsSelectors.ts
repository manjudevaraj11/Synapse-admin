import { type RootState } from "../../app/store";

export const selectPermissions = (state: RootState) =>
  state.permissions.permissions;

export const selectPermissionsLoading = (state: RootState) =>
  state.permissions.loading;

export const selectPermissionsError = (state: RootState) =>
  state.permissions.error;
