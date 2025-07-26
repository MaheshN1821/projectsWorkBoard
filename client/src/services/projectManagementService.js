import api from "./api";

class ProjectManagementService {
  async getProjectApplications(projectId, params = {}) {
    try {
      const response = await api.get(
        `/project-management/${projectId}/applications`,
        { params }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch project applications"
      );
    }
  }

  async acceptApplication(applicationId, message) {
    try {
      const response = await api.put(
        `/project-management/applications/${applicationId}/accept`,
        { message }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to accept application"
      );
    }
  }

  async rejectApplication(applicationId, message) {
    try {
      const response = await api.put(
        `/project-management/applications/${applicationId}/reject`,
        { message }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to reject application"
      );
    }
  }

  async getTeamMembers(projectId) {
    try {
      const response = await api.get(
        `/project-management/${projectId}/team-members`
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch team members"
      );
    }
  }

  async removeTeamMember(projectId, userId) {
    try {
      const response = await api.delete(
        `/project-management/${projectId}/team-members/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to remove team member"
      );
    }
  }
}

export default new ProjectManagementService();
