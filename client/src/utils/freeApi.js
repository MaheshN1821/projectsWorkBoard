import axios from "axios";

const freeApi = axios.create({
  baseURL: "https://projects-work-board.vercel.app/",
  withCredentials: true, // Allows cookies to be sent with the request
});

freeApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("im in freeApi.js before calling refreshToken endpoint");

        // Make a call to the refresh endpoint
        const response = await freeApi.get("/refreshToken/freelancer"); // Endpoint for refreshing tokens
        const newAccessToken = response.data.accessToken;

        // Set the new accessToken in the authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return freeApi(originalRequest);
      } catch (refreshError) {
        // Handle refresh failure (e.g., logout)
        console.log("Im in FreeApi file because of error");

        window.location.href = "/"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default freeApi;
