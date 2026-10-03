cat << 'INNER_EOF' > src/services/api.ts
import axios from 'axios';
import { entitiesData, findingsData, dashboardSummary, riskDistribution, findingsByCategory, findingsTrend } from '@/data';

const api = axios.create({
  baseURL: (import.meta as any).env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const EntityService = {
  getEntities: async () => {
    try {
      const response = await api.get('/entities');
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, falling back to mock entities data.");
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
  },
  getFindingById: async (id: string) => {
    try {
      const response = await api.get(`/findings/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`Backend unavailable, falling back to mock finding ${id}.`);
      return findingsData.find(f => f.id === id);
    }
  }
};

export const DashboardService = {
  getDashboardData: async () => {
    try {
      const [summary, risk, category, trend] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/dashboard/risk-distribution'),
        api.get('/dashboard/findings-by-category'),
        api.get('/dashboard/findings-trend')
      ]);
      return {
        summary: summary.data,
        riskDistribution: risk.data,
        findingsByCategory: category.data,
        findingsTrend: trend.data
      };
    } catch (error) {
      console.warn("Backend unavailable, falling back to mock dashboard data.");
      return {
        summary: dashboardSummary,
        riskDistribution,
        findingsByCategory,
        findingsTrend
      };
    }
  }
};

export default api;
INNER_EOF
