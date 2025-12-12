import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";
import { loginSuccess, setLoading } from "./authSlice";
import { tokenService } from "../../api/tokenService";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      const res = await api.post("/auth/admin/login", {
        email,
        password,
      });

      // accessToken returned by backend
      const { accessToken, user } = res.data;

      // store accessToken in memory
      tokenService.set(accessToken);

      // update Redux state
      thunkAPI.dispatch(loginSuccess({ user }));

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || "Login failed");
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
