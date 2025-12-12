import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient"; // <-- centralized axios instance
import { tokenService } from "../../api/tokenService";

export type Role = {
  id: string;
  name: string;
};

// --------------------------
// GET ROLES
// --------------------------
export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const token = tokenService.get();
  console.log('token: ', token);

  const res = await api.get("/roles", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data as Role[];
});

// --------------------------
// CREATE ROLE
// --------------------------
export const createRole = createAsyncThunk(
  "roles/createRole",
  async (name: string) => {
    const token = tokenService.get();

    const res = await api.post(
      "/roles",
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data as Role;
  }
);

// --------------------------
// UPDATE ROLE
// --------------------------
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, name }: { id: string; name: string }) => {
    const token = tokenService.get();

    const res = await api.patch(
      `/roles/${id}`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data as Role;
  }
);

// --------------------------
// DELETE ROLE
// --------------------------
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id: string) => {
    const token = tokenService.get();

    await api.delete(`/roles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  }
);

type RolesState = {
  roles: Role[];
  loading: boolean;
  error: string | null;
};

const initialState: RolesState = {
  roles: [],
  loading: false,
  error: null,
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch roles";
        state.loading = false;
      })

      // Create
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })

      // Update
      .addCase(updateRole.fulfilled, (state, action) => {
        const idx = state.roles.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.roles[idx] = action.payload;
      })

      // Delete
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((r) => r.id !== action.payload);
      });
  },
});

export default rolesSlice.reducer;
