import api from "./api";

class AuthService {
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      if (response.data.success) {
        const { user, token } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return { user, token };
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }

  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        const { user, token } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return { user, token };
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  async getCurrentUser() {
    try {
      const response = await api.get("/auth/me");
      if (response.data.success) {
        const user = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get user");
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Password change failed"
      );
    }
  }

  getStoredUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  getStoredToken() {
    return localStorage.getItem("token");
  }

  isAuthenticated() {
    return !!this.getStoredToken();
  }
}

export default new AuthService();
