import axios from 'axios';
import { entitiesData, findingsData, dashboardSummary } from '@/data';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// We provide fallback to mock data if the backend is not running yet
export const EntityService = {
  getEntities: async () => {
    try {
      const response = await api.get('/entities');
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, falling back to mock entities data.", error);
      return entitiesData;
    }
  },
  getEntityById: async (id: string) => {
    try {
      const response = await api.get(`/entities/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`Backend unavailable, falling back to mock entity ${id}.`);
      return entitiesData.find(e => e.id === id);
    }
  }
};

export const FindingsService = {
  getFindings: async () => {
    try {
      const response = await api.get('/findings');
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, falling back to mock findings data.");
      return findingsData;
    }
  }
};

export const DashboardService = {
  getSummary: async () => {
    try {
      const response = await api.get('/dashboard/summary');
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, falling back to mock dashboard data.");
      return dashboardSummary;
    }
  }
};

export default api;