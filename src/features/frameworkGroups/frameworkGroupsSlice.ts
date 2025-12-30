import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axiosClient";

/* ================================
   TYPES
================================ */

export type FrameworkGroup = {
  id: string;
  name: string;
  description?: string;
  sortOrder?: number;
  frameworkStageId: string;
};

/* ================================
   THUNKS
================================ */

/**
 * GET groups by stage
 * GET /framework-stages/:stageId/groups
 */
export const fetchFrameworkGroupsByStage = createAsyncThunk(
  "frameworkGroups/fetchByStage",
  async (stageId: string) => {
    const res = await api.get(`/frameworks/framework-stages/${stageId}/groups`);

    return {
      stageId,
      groups: res.data as FrameworkGroup[],
    };
  }
);

/**
 * CREATE group
 * POST /framework-stages/:stageId/groups
 */
export const createFrameworkGroup = createAsyncThunk(
  "frameworkGroups/create",
  async (
    {
      stageId,
      title,
      subtitle,
      description,
      sortOrder,
      metadata,
    }: {
      stageId: string;
      title: string;
      subtitle?: string;
      description?: string;
      sortOrder?: number;
      metadata?: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(
        `/frameworks/framework-stages/${stageId}/groups`,
        {
          title,
          subtitle,
          description,
          sortOrder,
          metadata,
        }
      );

      return {
        stageId,
        group: res.data,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/**
 * UPDATE group
 * PATCH /framework-groups/:id
 */
export const updateFrameworkGroup = createAsyncThunk(
  "frameworkGroups/update",
  async (
    {
      id,
      stageId,
      name,
      description,
      sortOrder,
    }: {
      id: string;
      stageId: string;
      name: string;
      description?: string;
      sortOrder?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.patch(`/frameworks/framework-groups/${id}`, {
        name,
        description,
        sortOrder,
      });

      return {
        stageId,
        group: res.data as FrameworkGroup,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/**
 * DELETE group (soft delete)
 * DELETE /framework-groups/:id
 */
export const deleteFrameworkGroup = createAsyncThunk(
  "frameworkGroups/delete",
  async (
    {
      id,
      stageId,
    }: {
      id: string;
      stageId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await api.delete(`/frameworks/framework-groups/${id}`);
      return { id, stageId };
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchFrameworkGroupById = createAsyncThunk(
  "frameworkGroups/fetchById",
  async (groupId: string) => {
    const res = await api.get(`/frameworks/framework-groups/${groupId}`);
    return res.data;
  }
);

/* ================================
   SLICE
================================ */

type FrameworkGroupsState = {
  byStage: Record<string, FrameworkGroup[]>;
  byId: Record<string, FrameworkGroup>;
  loading: boolean;
};

const initialState: FrameworkGroupsState = {
  byStage: {},
  byId: {},
  loading: false,
};

const frameworkGroupsSlice = createSlice({
  name: "frameworkGroups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ---------- */
      .addCase(fetchFrameworkGroupsByStage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFrameworkGroupsByStage.fulfilled, (state, action) => {
        state.byStage[action.payload.stageId] = action.payload.groups;
        state.loading = false;
      })
      .addCase(fetchFrameworkGroupsByStage.rejected, (state) => {
        state.loading = false;
      })

      /* ---------- CREATE ---------- */
      .addCase(createFrameworkGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFrameworkGroup.fulfilled, (state, action) => {
        const { stageId, group } = action.payload;

        if (!state.byStage[stageId]) {
          state.byStage[stageId] = [];
        }

        state.byStage[stageId].push(group);
        state.loading = false;
      })
      .addCase(createFrameworkGroup.rejected, (state) => {
        state.loading = false;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateFrameworkGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFrameworkGroup.fulfilled, (state, action) => {
        const { stageId, group } = action.payload;

        const list = state.byStage[stageId];
        if (!list) return;

        const index = list.findIndex((g) => g.id === group.id);

        if (index !== -1) {
          list[index] = group;
        }

        state.loading = false;
      })
      .addCase(updateFrameworkGroup.rejected, (state) => {
        state.loading = false;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteFrameworkGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFrameworkGroup.fulfilled, (state, action) => {
        const { id, stageId } = action.payload;

        state.byStage[stageId] = state.byStage[stageId]?.filter(
          (g) => g.id !== id
        );

        state.loading = false;
      })
      .addCase(deleteFrameworkGroup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchFrameworkGroupById.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      });
  },
});

export default frameworkGroupsSlice.reducer;
