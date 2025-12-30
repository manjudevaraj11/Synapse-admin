import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axiosClient";

// --------------------------
// TYPES
// --------------------------
export type OrganisationFramework = {
  id: string;
  organisationId: string;
  frameworkId: string;
  settings?: any;
  organisation?: any;
  framework?: any;
};

// --------------------------
// ASSIGN FRAMEWORK
// POST /organisation-frameworks
// --------------------------
export const assignFrameworkToOrganisation = createAsyncThunk(
  "organisationFrameworks/assign",
  async (
    {
      organisationId,
      frameworkId,
      settings,
    }: {
      organisationId: string;
      frameworkId: string;
      settings?: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/organisation-frameworks", {
        organisationId,
        frameworkId,
        settings,
      });

      return res.data as OrganisationFramework;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// --------------------------
// GET ALL ORG FRAMEWORKS
// --------------------------
export const fetchOrganisationFrameworks = createAsyncThunk(
  "organisationFrameworks/fetchAll",
  async () => {
    const res = await api.get("/organisation-frameworks");
    return res.data as OrganisationFramework[];
  }
);

// --------------------------
// GET ORG FRAMEWORKS BY ORGANISATION
// --------------------------
export const fetchOrganisationFrameworksByOrganisation = createAsyncThunk(
  "organisationFrameworks/fetchByOrganisation",
  async (organisationId: string) => {
    const res = await api.get(
      `/organisation-frameworks/organisation/${organisationId}`
    );
    return res.data as OrganisationFramework[];
  }
);

// --------------------------
// REMOVE FRAMEWORK
// --------------------------
export const removeFrameworkFromOrganisation = createAsyncThunk(
  "organisationFrameworks/remove",
  async (id: string) => {
    await api.delete(`/organisation-frameworks/${id}`);
    return id;
  }
);

// --------------------------
// SLICE
// --------------------------
type OrganisationFrameworksState = {
  records: OrganisationFramework[];
  loading: boolean;
};

const initialState: OrganisationFrameworksState = {
  records: [],
  loading: false,
};

const organisationFrameworksSlice = createSlice({
  name: "organisationFrameworks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchOrganisationFrameworks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganisationFrameworks.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrganisationFrameworks.rejected, (state) => {
        state.loading = false;
      })

      // Assign
      .addCase(assignFrameworkToOrganisation.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })

      // Fetch by organisation
      .addCase(fetchOrganisationFrameworksByOrganisation.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOrganisationFrameworksByOrganisation.fulfilled,
        (state, action) => {
          state.records = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOrganisationFrameworksByOrganisation.rejected, (state) => {
        state.loading = false;
      })

      // Remove
      .addCase(removeFrameworkFromOrganisation.fulfilled, (state, action) => {
        state.records = state.records.filter((r) => r.id !== action.payload);
      });
  },
});

export default organisationFrameworksSlice.reducer;
