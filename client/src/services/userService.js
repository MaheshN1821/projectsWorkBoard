import api from "./api";

class UserService {
  async getProfile() {
    try {
      const response = await api.get("/users/profile");
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await api.put("/users/profile", profileData);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }

  async getUser(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
  }

  async searchUsers(params = {}) {
    try {
      const response = await api.get("/users", { params });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to search users"
      );
    }
  }

  async addExperience(experienceData) {
    try {
      const response = await api.post("/users/experience", experienceData);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add experience"
      );
    }
  }

  async updateExperience(experienceId, experienceData) {
    try {
      const response = await api.put(
        `/users/experience/${experienceId}`,
        experienceData
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update experience"
      );
    }
  }

  async deleteExperience(experienceId) {
    try {
      const response = await api.delete(`/users/experience/${experienceId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete experience"
      );
    }
  }

  async getDashboardStats() {
    try {
      const response = await api.get("/users/dashboard/stats");
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }

  async updatePreferences(preferences) {
    try {
      const response = await api.put("/users/preferences", preferences);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update preferences"
      );
    }
  }
}

export default new UserService();
