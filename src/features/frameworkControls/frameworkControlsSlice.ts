import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axiosClient";

/**
 * FrameworkControl type
 */
export type FrameworkControl = {
  id: string;
  frameworkGroupId: string;
  controlId: string;
  title: string;
  description?: string | null;
  sortOrder: number;
  metadata?: any;
};

/**
 * STATE
 */
type FrameworkControlsState = {
  byGroup: Record<string, FrameworkControl[]>;
  loading: boolean;
  error?: string | null;
};

const initialState: FrameworkControlsState = {
  byGroup: {},
  loading: false,
  error: null,
};

/**
 * GET controls by group
 * GET /framework-groups/:groupId/controls
 */
export const fetchFrameworkControlsByGroup = createAsyncThunk(
  "frameworkControls/fetchByGroup",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/frameworks/framework-groups/${groupId}/controls`
      );

      return {
        groupId,
        controls: res.data as FrameworkControl[],
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/**
 * CREATE control
 * POST /framework-groups/:groupId/controls
 */
export const createFrameworkControl = createAsyncThunk(
  "frameworkControls/create",
  async (
    {
      groupId,
      controlId,
      title,
      description,
      sortOrder,
      metadata,
    }: {
      groupId: string;
      controlId: string;
      title: string;
      description?: string;
      sortOrder?: number;
      metadata?: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(
        `/frameworks/framework-groups/${groupId}/controls`,
        {
          controlId,
          title,
          description,
          sortOrder,
          metadata,
        }
      );

      return {
        groupId,
        control: res.data as FrameworkControl,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/**
 * UPDATE control
 * PATCH /framework-controls/:id
 */
export const updateFrameworkControl = createAsyncThunk(
  "frameworkControls/update",
  async (
    {
      id,
      groupId,
      data,
    }: {
      id: string;
      groupId: string;
      data: {
        controlId?: string;
        title?: string;
        description?: string;
        sortOrder?: number;
        metadata?: any;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.patch(
        `/frameworks/framework-controls/${id}`,
        data
      );

      return {
        groupId,
        control: res.data as FrameworkControl,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/**
 * DELETE control (soft delete)
 * DELETE /framework-controls/:id
 */
export const deleteFrameworkControl = createAsyncThunk(
  "frameworkControls/delete",
  async (
    {
      id,
      groupId,
    }: {
      id: string;
      groupId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await api.delete(`/frameworks/framework-controls/${id}`);
      return { id, groupId };
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/**
 * SLICE
 */
const frameworkControlsSlice = createSlice({
  name: "frameworkControls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchFrameworkControlsByGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFrameworkControlsByGroup.fulfilled, (state, action) => {
        state.byGroup[action.payload.groupId] =
          action.payload.controls;
        state.loading = false;
      })
      .addCase(fetchFrameworkControlsByGroup.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to load controls";
      })

      // Create
      .addCase(createFrameworkControl.fulfilled, (state, action) => {
        const { groupId, control } = action.payload;

        if (!state.byGroup[groupId]) {
          state.byGroup[groupId] = [];
        }

        state.byGroup[groupId].push(control);
      })

      // Update
      .addCase(updateFrameworkControl.fulfilled, (state, action) => {
        const { groupId, control } = action.payload;

        const list = state.byGroup[groupId];
        if (!list) return;

        const idx = list.findIndex((c) => c.id === control.id);
        if (idx !== -1) {
          list[idx] = control;
        }
      })

      // Delete
      .addCase(deleteFrameworkControl.fulfilled, (state, action) => {
        const { id, groupId } = action.payload;

        state.byGroup[groupId] = (
          state.byGroup[groupId] || []
        ).filter((c) => c.id !== id);
      });
  },
});

export default frameworkControlsSlice.reducer;
