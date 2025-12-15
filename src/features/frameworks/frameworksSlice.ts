import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";
import { tokenService } from "../../api/tokenService";

// --------------------------
// TYPE
// --------------------------
export type Framework = {
  id: string;
  name: string;
  description?: string | null;
  status: string;
};

// --------------------------
// GET FRAMEWORKS
// --------------------------
export const fetchFrameworks = createAsyncThunk(
  "frameworks/fetchFrameworks",
  async () => {
    const token = tokenService.get();

    const res = await api.get("/frameworks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data as Framework[];
  }
);

// --------------------------
// CREATE FRAMEWORK
// --------------------------
export const createFramework = createAsyncThunk(
  "frameworks/createFramework",
  async (
    data: { name: string; slug: string; code: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/frameworks", data);
      return res.data;
    } catch (err: any) {
      // 👇 this is where Zod errors live
      return rejectWithValue(err.response?.data);
    }
  }
);
// --------------------------
// UPDATE FRAMEWORK
// --------------------------
export const updateFramework = createAsyncThunk(
  "frameworks/updateFramework",
  async ({
    id,
    name,
    description,
  }: {
    id: string;
    name: string;
    description?: string;
  }) => {
    const token = tokenService.get();

    const res = await api.patch(
      `/frameworks/${id}`,
      { name, description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data as Framework;
  }
);

// --------------------------
// DELETE FRAMEWORK
// --------------------------
export const deleteFramework = createAsyncThunk(
  "frameworks/deleteFramework",
  async (id: string) => {
    const token = tokenService.get();

    await api.delete(`/frameworks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  }
);

// --------------------------
// SLICE
// --------------------------
type FrameworksState = {
  frameworks: Framework[];
  loading: boolean;
  error: string | null;
};

const initialState: FrameworksState = {
  frameworks: [],
  loading: false,
  error: null,
};

export const frameworksSlice = createSlice({
  name: "frameworks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchFrameworks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFrameworks.fulfilled, (state, action) => {
        state.frameworks = action.payload;
        state.loading = false;
      })
      .addCase(fetchFrameworks.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch frameworks";
        state.loading = false;
      })

      // Create
      .addCase(createFramework.fulfilled, (state, action) => {
        state.frameworks.push(action.payload);
      })

      // Update
      .addCase(updateFramework.fulfilled, (state, action) => {
        const idx = state.frameworks.findIndex(
          (f) => f.id === action.payload.id
        );
        if (idx !== -1) state.frameworks[idx] = action.payload;
      })

      // Delete
      .addCase(deleteFramework.fulfilled, (state, action) => {
        state.frameworks = state.frameworks.filter(
          (f) => f.id !== action.payload
        );
      });
  },
});

export default frameworksSlice.reducer;
