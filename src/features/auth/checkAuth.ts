import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";
import { loginSuccess } from "./authSlice";
import { tokenService } from "../../api/tokenService";
import { setAuthReady } from "./authSlice";


export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/auth/refresh", {}, { withCredentials: true });

      const { accessToken, user } = res.data;

      tokenService.set(accessToken);

      thunkAPI.dispatch(loginSuccess({ user }));
    } catch {
      console.warn("Not authenticated");
    } finally {
      thunkAPI.dispatch(setAuthReady());
    }
  }
);
