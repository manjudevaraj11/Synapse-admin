import { type RootState } from "../../app/store";

export const selectRoles = (state: RootState) => state.roles.roles;
export const selectRolesLoading = (state: RootState) => state.roles.loading;
export const selectRolesError = (state: RootState) => state.roles.error;
