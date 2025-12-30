import { type RootState } from "../../app/store";

export const selectFrameworkStages = (state: RootState) =>
  state.frameworkStages.stages;

export const selectFrameworkStagesLoading = (state: RootState) =>
  state.frameworkStages.loading;

export const selectFrameworkStagesError = (state: RootState) =>
  state.frameworkStages.error;

export const selectStagesWithGroups = (state: any) =>
  state.frameworkStages.stagesWithGroups;

export const selectStagesWithGroupsLoading = (state: any) =>
  state.frameworkStages.loading;
