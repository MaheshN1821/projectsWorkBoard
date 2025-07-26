import api from "./api";

class ProjectService {
  async getProjects(params = {}) {
    try {
      const response = await api.get("/projects", { params });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }

  async getProject(id) {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch project"
      );
    }
  }

  async createProject(projectData) {
    try {
      const response = await api.post("/projects", projectData);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create project"
      );
    }
  }

  async updateProject(id, projectData) {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update project"
      );
    }
  }

  async deleteProject(id) {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  }

  async toggleInterest(id) {
    try {
      const response = await api.post(`/projects/${id}/interest`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to toggle interest"
      );
    }
  }

  async getInterestedUsers(id) {
    try {
      const response = await api.get(`/projects/${id}/interested-users`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch interested users"
      );
    }
  }

  async getUserProjects(userId, params = {}) {
    try {
      const response = await api.get(`/projects/user/${userId}`, { params });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user projects"
      );
    }
  }
}

export default new ProjectService();
