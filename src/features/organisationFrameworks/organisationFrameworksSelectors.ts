import { type RootState } from "@/app/store";

export const selectOrganisationFrameworks = (state: RootState) =>
  state.organisationFrameworks.records;

export const selectOrganisationFrameworksLoading = (state: RootState) =>
  state.organisationFrameworks.loading;
