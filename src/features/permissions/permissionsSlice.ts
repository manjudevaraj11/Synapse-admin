import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient"; 
import { tokenService } from "../../api/tokenService";

// Permission type
export type Permission = {
  id: string;
  name: string;
};

// --------------------------
// GET PERMISSIONS
// --------------------------
export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async () => {
    const token = tokenService.get();

    const res = await api.get("/permissions", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data as Permission[];
  }
);

// --------------------------
// CREATE PERMISSION
// --------------------------
export const createPermission = createAsyncThunk(
  "permissions/createPermission",
  async (name: string) => {
    const token = tokenService.get();

    const res = await api.post(
      "/permissions",
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data as Permission;
  }
);

// --------------------------
// UPDATE PERMISSION
// --------------------------
export const updatePermission = createAsyncThunk(
  "permissions/updatePermission",
  async ({ id, name }: { id: string; name: string }) => {
    const token = tokenService.get();

    const res = await api.patch(
      `/permissions/${id}`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data as Permission;
  }
);

// --------------------------
// DELETE PERMISSION
// --------------------------
export const deletePermission = createAsyncThunk(
  "permissions/deletePermission",
  async (id: string) => {
    const token = tokenService.get();

    await api.delete(`/permissions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  }
);

// --------------------------
// SLICE
// --------------------------
type PermissionsState = {
  permissions: Permission[];
  loading: boolean;
  error: string | null;
};

const initialState: PermissionsState = {
  permissions: [],
  loading: false,
  error: null,
};

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload;
        state.loading = false;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch permissions";
        state.loading = false;
      })

      // Create
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload);
      })

      // Update
      .addCase(updatePermission.fulfilled, (state, action) => {
        const idx = state.permissions.findIndex(
          (p) => p.id === action.payload.id
        );
        if (idx !== -1) state.permissions[idx] = action.payload;
      })

      // Delete
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permissions = state.permissions.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default permissionsSlice.reducer;
