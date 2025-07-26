import { useState, useEffect } from "react";
import projectService from "../services/projectService";

export const useProjects = (filters = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchProjects = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectService.getProjects({ ...filters, ...params });
      setProjects(data.projects);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [JSON.stringify(filters)]);

  const refetch = (params = {}) => {
    fetchProjects(params);
  };

  return {
    projects,
    loading,
    error,
    pagination,
    refetch,
  };
};

export const useProject = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await projectService.getProject(id);
        setProject(data.project);
        setUserData(data.userData || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const toggleInterest = async () => {
    const result = await projectService.toggleInterest(id);
    setUserData((prev) => ({
      ...prev,
      isInterested: result.isInterested,
    }));
    setProject((prev) => ({
      ...prev,
      interestedCount: result.interestedCount,
    }));
  };

  return {
    project,
    userData,
    loading,
    error,
    toggleInterest,
  };
};
