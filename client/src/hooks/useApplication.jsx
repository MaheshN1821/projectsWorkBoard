import { useState, useEffect } from "react";
import applicationService from "../services/applicationService";

export const useMyApplications = (filters = {}) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchApplications = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await applicationService.getMyApplications({
        ...filters,
        ...params,
      });
      setApplications(data.applications);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [JSON.stringify(filters)]);

  const refetch = (params = {}) => {
    fetchApplications(params);
  };

  return {
    applications,
    loading,
    error,
    pagination,
    refetch,
  };
};

export const useProjectApplications = (projectId, filters = {}) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchApplications = async (params = {}) => {
    if (!projectId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await applicationService.getProjectApplications(projectId, {
        ...filters,
        ...params,
      });
      setApplications(data.applications);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [projectId, JSON.stringify(filters)]);

  const refetch = (params = {}) => {
    fetchApplications(params);
  };

  return {
    applications,
    loading,
    error,
    pagination,
    refetch,
  };
};
