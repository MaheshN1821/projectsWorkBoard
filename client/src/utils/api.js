import axios from "axios";

const api = axios.create({
  baseURL: "https://projects-work-board.vercel.app",
  withCredentials: true, // Allows cookies to be sent with the request
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("im in api.js before calling refreshToken endpoint");

        // Make a call to the refresh endpoint
        const response = await api.get("/refreshToken/user"); // Endpoint for refreshing tokens
        const newAccessToken = response.data.accessToken;

        // Set the new accessToken in the authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh failure (e.g., logout)
        console.log("Im in Api file because of error");

        window.location.href = "https://projectsworkboard.vercel.app/"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
