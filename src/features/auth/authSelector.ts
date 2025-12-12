import { type RootState } from "../../app/store";

export const selectAuthReady = (state: RootState) => state.auth.authReady;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
