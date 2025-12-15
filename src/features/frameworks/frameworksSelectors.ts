import { type RootState } from "@/app/store";

export const selectFrameworks = (state: RootState) =>
  state.frameworks.frameworks;

export const selectFrameworksLoading = (state: RootState) =>
  state.frameworks.loading;