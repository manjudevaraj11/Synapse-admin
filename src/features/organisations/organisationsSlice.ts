import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axiosClient";

// --------------------------
// TYPE
// --------------------------
export type Organisation = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  websiteUrl?: string;
  address?: string;
  primaryContactName?: string;
  primaryContactEmail?: string;
  primaryContactPhone?: string;
  logoUrl?: string;
  industry?: string;
  status: string;
};

// --------------------------
// GET ORGANISATIONS
// --------------------------
export const fetchOrganisations = createAsyncThunk(
  "organisations/fetchOrganisations",
  async () => {
    const res = await api.get("/organisations");
    return res.data as Organisation[];
  }
);

// --------------------------
// CREATE ORGANISATION
// --------------------------
export const createOrganisation = createAsyncThunk(
  "organisations/createOrganisation",
  async (data: Partial<Organisation>, { rejectWithValue }) => {
    try {
      const res = await api.post("/organisations", data);
      return res.data as Organisation;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// --------------------------
// UPDATE ORGANISATION
// --------------------------
export const updateOrganisation = createAsyncThunk(
  "organisations/updateOrganisation",
  async (
    { id, ...data }: { id: string } & Partial<Organisation>,
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/organisations/${id}`, data);
      return res.data as Organisation;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// --------------------------
// DELETE (SOFT)
// --------------------------
export const deleteOrganisation = createAsyncThunk(
  "organisations/deleteOrganisation",
  async (id: string) => {
    await api.delete(`/organisations/${id}`);
    return id;
  }
);

// --------------------------
// GET ORGANISATION BY ID
// --------------------------
export const fetchOrganisationById = createAsyncThunk(
  "organisations/fetchOrganisationById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/organisations/${id}`);
      return res.data as Organisation;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// --------------------------
// SLICE
// --------------------------
type OrganisationsState = {
  organisations: Organisation[];
  currentOrganisation: Organisation | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrganisationsState = {
  organisations: [],
  currentOrganisation: null,
  loading: false,
  error: null,
};

const organisationsSlice = createSlice({
  name: "organisations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --------------------
      // LIST
      // --------------------
      .addCase(fetchOrganisations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganisations.fulfilled, (state, action) => {
        state.organisations = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrganisations.rejected, (state) => {
        state.loading = false;
      })

      // --------------------
      // SINGLE
      // --------------------
      .addCase(fetchOrganisationById.pending, (state) => {
        state.loading = true;
        state.currentOrganisation = null;
      })
      .addCase(fetchOrganisationById.fulfilled, (state, action) => {
        state.currentOrganisation = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrganisationById.rejected, (state) => {
        state.loading = false;
      })

      // --------------------
      // CREATE
      // --------------------
      .addCase(createOrganisation.fulfilled, (state, action) => {
        state.organisations.push(action.payload);
      })

      // --------------------
      // UPDATE
      // --------------------
      .addCase(updateOrganisation.fulfilled, (state, action) => {
        const idx = state.organisations.findIndex(
          (o) => o.id === action.payload.id
        );
        if (idx !== -1) state.organisations[idx] = action.payload;

        // 🔑 keep details page in sync
        if (state.currentOrganisation?.id === action.payload.id) {
          state.currentOrganisation = action.payload;
        }
      })

      // --------------------
      // DELETE
      // --------------------
      .addCase(deleteOrganisation.fulfilled, (state, action) => {
        state.organisations = state.organisations.filter(
          (o) => o.id !== action.payload
        );
        if (state.currentOrganisation?.id === action.payload) {
          state.currentOrganisation = null;
        }
      });
  },
});

export default organisationsSlice.reducer;
