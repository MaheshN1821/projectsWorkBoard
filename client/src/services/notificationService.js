import api from "./api";

class NotificationService {
  async getNotifications(params = {}) {
    try {
      const response = await api.get("/notifications", { params });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch notifications"
      );
    }
  }

  async markAsRead(id) {
    try {
      const response = await api.put(`/notifications/${id}/read`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to mark notification as read"
      );
    }
  }

  async markAllAsRead() {
    try {
      const response = await api.put("/notifications/mark-all-read");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to mark all notifications as read"
      );
    }
  }

  async deleteNotification(id) {
    try {
      const response = await api.delete(`/notifications/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete notification"
      );
    }
  }

  async getUnreadCount() {
    try {
      const response = await api.get("/notifications/unread-count");
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch unread count"
      );
    }
  }
}

export default new NotificationService();
