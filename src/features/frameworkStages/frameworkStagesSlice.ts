import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

/**
 * FrameworkStage type (used in Stages tab)
 */
export type FrameworkStage = {
  id: string;
  frameworkId: string;
  code?: string | null;
  title: string;
  description?: string | null;
  sortOrder: number;
  metadata?: any;
};

/**
 * Stage + Groups (used ONLY in Groups tab)
 */
export type StageWithGroups = {
  id: string;
  frameworkId: string;
  title: string;
  description?: string | null;
  sortOrder: number;
  metadata?: any;
  groups: {
    id: string;
    title: string;
    subtitle?: string | null;
    description?: string | null;
    sortOrder: number;
    metadata?: any;
  }[];
};

type UpdateFrameworkStagePayload = {
  title?: string;
  code?: string;
  description?: string;
  sortOrder?: number;
  metadata?: any;
};

type FrameworkStagesState = {
  /** Used by Stages tab */
  stages: FrameworkStage[];
  loadingStages: boolean;

  /** Used by Groups tab (aggregated API) */
  stagesWithGroups: StageWithGroups[];
  loadingGroups: boolean;

  /** Shared error state */
  error: string | null;
};

/* ------------------------------------------------------
   THUNKS
------------------------------------------------------ */

/**
 * GET stages by framework (Stages tab)
 */
export const fetchFrameworkStagesByFramework = createAsyncThunk(
  "frameworkStages/fetchByFramework",
  async (frameworkId: string) => {
    const res = await api.get(`/frameworks/${frameworkId}/stages`);
    return res.data as FrameworkStage[];
  }
);

/**
 * GET stages WITH groups (Groups tab)
 */
export const fetchStagesWithGroupsByFramework = createAsyncThunk(
  "frameworkStages/fetchWithGroups",
  async (frameworkId: string) => {
    const res = await api.get(
      `/frameworks/${frameworkId}/stages-with-groups`
    );
    return res.data as StageWithGroups[];
  }
);

/**
 * CREATE stage
 */
export const createFrameworkStage = createAsyncThunk(
  "frameworkStages/create",
  async ({
    frameworkId,
    data,
  }: {
    frameworkId: string;
    data: {
      title: string;
      code?: string;
      description?: string;
      sortOrder?: number;
      metadata?: any;
    };
  }) => {
    const res = await api.post(`/frameworks/${frameworkId}/stages`, data);
    return res.data as FrameworkStage;
  }
);

/**
 * UPDATE stage
 */
export const updateFrameworkStage = createAsyncThunk(
  "frameworkStages/update",
  async ({
    id,
    data,
  }: {
    id: string;
    data: UpdateFrameworkStagePayload;
  }) => {
    const res = await api.patch(`/frameworks/stages/${id}`, data);
    return res.data as FrameworkStage;
  }
);

/**
 * DELETE stage
 */
export const deleteFrameworkStage = createAsyncThunk(
  "frameworkStages/delete",
  async (id: string) => {
    await api.delete(`/frameworks/stages/${id}`);
    return id;
  }
);

/* ------------------------------------------------------
   SLICE
------------------------------------------------------ */

const initialState: FrameworkStagesState = {
  stages: [],
  loadingStages: false,

  stagesWithGroups: [],
  loadingGroups: false,

  error: null,
};

export const frameworkStagesSlice = createSlice({
  name: "frameworkStages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ---------- STAGES TAB ---------- */
      .addCase(fetchFrameworkStagesByFramework.pending, (state) => {
        state.loadingStages = true;
        state.error = null;
      })
      .addCase(fetchFrameworkStagesByFramework.fulfilled, (state, action) => {
        state.stages = action.payload;
        state.loadingStages = false;
      })
      .addCase(fetchFrameworkStagesByFramework.rejected, (state, action) => {
        state.loadingStages = false;
        state.error =
          action.error.message || "Failed to fetch framework stages";
      })

      .addCase(createFrameworkStage.fulfilled, (state, action) => {
        state.stages.push(action.payload);
      })

      .addCase(updateFrameworkStage.fulfilled, (state, action) => {
        const index = state.stages.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.stages[index] = action.payload;
        }
      })

      .addCase(deleteFrameworkStage.fulfilled, (state, action) => {
        state.stages = state.stages.filter(
          (s) => s.id !== action.payload
        );
      })

      /* ---------- GROUPS TAB ---------- */
      .addCase(fetchStagesWithGroupsByFramework.pending, (state) => {
        state.loadingGroups = true;
        state.error = null;
      })
      .addCase(fetchStagesWithGroupsByFramework.fulfilled, (state, action) => {
        state.stagesWithGroups = action.payload;
        state.loadingGroups = false;
      })
      .addCase(fetchStagesWithGroupsByFramework.rejected, (state, action) => {
        state.loadingGroups = false;
        state.error =
          action.error.message ||
          "Failed to fetch framework stages with groups";
      });
  },
});

export default frameworkStagesSlice.reducer;
