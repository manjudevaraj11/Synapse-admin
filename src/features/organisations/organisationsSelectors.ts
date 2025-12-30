import { type RootState } from "@/app/store";

export const selectOrganisations = (state: RootState) =>
  state.organisations.organisations;

export const selectCurrentOrganisation = (state: RootState) =>
  state.organisations.currentOrganisation;

export const selectOrganisationLoading = (state: RootState) =>
  state.organisations.loading;
