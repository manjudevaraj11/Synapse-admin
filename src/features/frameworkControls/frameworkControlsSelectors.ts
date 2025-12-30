import { type RootState } from "@/app/store";

export const selectFrameworkControlsState = (state: RootState) =>
  state.frameworkControls;

export const selectControlsByGroup =
  (groupId: string) => (state: RootState) =>
    state.frameworkControls.byGroup[groupId] || [];

export const selectControlsLoading = (state: RootState) =>
  state.frameworkControls.loading;
