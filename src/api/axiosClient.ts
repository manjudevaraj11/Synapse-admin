import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // change to your backend URL
  withCredentials: true, // allows cookies to be sent (important for refresh tokens later)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
