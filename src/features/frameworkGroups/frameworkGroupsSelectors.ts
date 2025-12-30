import { type RootState } from "@/app/store";

export const selectFrameworkGroupsByStage =
  (stageId: string) => (state: RootState) =>
    state.frameworkGroups.byStage[stageId] || [];

export const selectFrameworkGroupsLoading = (state: RootState) =>
  state.frameworkGroups.loading;

export const selectGroupById = (groupId: string) => (state: RootState) =>
  state.frameworkGroups.byId[groupId];
