  import axios from "axios";
  import { tokenService } from "./tokenService";

  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1", // change to your backend URL
    withCredentials: true, // allows cookies to be sent (important for refresh tokens later)
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Attach access token for all requests
  api.interceptors.request.use((config) => {
    const token = tokenService.get();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Handle 403 (expired access token)
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      // Avoid infinite loop
      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await api.post("/auth/refresh");
          console.log("refreshResponse:---- ", refreshResponse);

          const newAccessToken = refreshResponse.data.accessToken;

          tokenService.set(newAccessToken);

          // retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshErr) {
          console.log("refreshErr: ", refreshErr);
          tokenService.clear();
          window.location.href = "/login";
        }
      }

      if (error.response?.status === 401) {
        tokenService.clear();
        // Prevent infinite redirect loop on login page
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  export default api;
