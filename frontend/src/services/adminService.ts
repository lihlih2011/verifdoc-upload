import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Axios instance with interceptor for auth
const adminApi = axios.create({
    baseURL: `${API_URL}/admin`,
    headers: {
        'Content-Type': 'application/json',
    },
});

adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface UserAdminView {
    id: number;
    email: string;
    full_name: string;
    role: string;
    is_active: boolean;
    credits_balance: number;
    created_at: string;
}

export interface AdminStats {
    total_users: number;
    total_organizations: number;
    total_analyses: number;
    total_credits_used: number;
}

export const adminService = {
    // Stats
    getStats: async (): Promise<AdminStats> => {
        const response = await adminApi.get('/stats');
        return response.data;
    },

    // User Management
    getAllUsers: async (skip = 0, limit = 50, search = ''): Promise<{ total: number, users: UserAdminView[] }> => {
        const response = await adminApi.get('/users', { params: { skip, limit, search } });
        return response.data;
    },

    updateUserStatus: async (userId: number, isActive: boolean) => {
        const response = await adminApi.put(`/users/${userId}/status`, null, { params: { is_active: isActive } });
        return response.data;
    },

    updateUserRole: async (userId: number, role: string) => {
        const response = await adminApi.post(`/users/${userId}/role`, null, { params: { role } });
        return response.data;
    },

    // Credits - The "Banker" feature
    addUserCredits: async (userId: number, amount: number) => {
        const response = await adminApi.post(`/users/${userId}/credits`, null, { params: { amount } });
        return response.data;
    },

    // System Health
    getHealth: async () => {
        const response = await adminApi.get('/health');
        return response.data;
    },

    // Export users CSV
    exportUsers: async () => {
        const resp = await adminApi.get('/export/users', { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    },

    // Stats history for charts
    getStatsHistory: async () => {
        const response = await adminApi.get('/stats/history');
        return response.data;
    },

    // Maintenance flag
    getMaintenanceFlag: async () => {
        const response = await adminApi.get('/maintenance');
        return response.data.enabled;
    },

    setMaintenanceFlag: async (enabled: boolean) => {
        const response = await adminApi.post('/maintenance', { enabled });
        return response.data;
    },

    // Generate monthly PDF report
    generateMonthlyReport: async () => {
        const resp = await adminApi.get('/report/monthly', { responseType: 'blob' });
        return new Blob([resp.data], { type: 'application/pdf' });
    }
};
