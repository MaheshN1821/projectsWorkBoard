import api from "./api";

class ApplicationService {
  async applyToProject(applicationData) {
    // console.log(applicationData);
    try {
      const response = await api.post("/applications", applicationData);
      // console.log(response);

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to submit application"
      );
    }
  }

  async getMyApplications(params = {}) {
    try {
      const response = await api.get("/applications/my-applications", {
        params,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch applications"
      );
    }
  }

  async getProjectApplications(projectId, params = {}) {
    try {
      const response = await api.get(`/applications/project/${projectId}`, {
        params,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch project applications"
      );
    }
  }

  async getApplication(id) {
    try {
      const response = await api.get(`/applications/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch application"
      );
    }
  }

  async acceptApplication(id, message) {
    try {
      const response = await api.put(`/applications/${id}/accept`, { message });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to accept application"
      );
    }
  }

  async rejectApplication(id, message) {
    try {
      const response = await api.put(`/applications/${id}/reject`, { message });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to reject application"
      );
    }
  }

  async withdrawApplication(id) {
    try {
      const response = await api.put(`/applications/${id}/withdraw`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to withdraw application"
      );
    }
  }
}

export default new ApplicationService();
