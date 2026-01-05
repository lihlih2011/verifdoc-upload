import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define User Type
interface User {
    full_name: string;
    email: string; // We might want to store email too
    role: string;
    credits: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, userData: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        // On Init, check localStorage
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        console.log("Auto-Logout: Token Expired or Invalid");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        // Redirect to signin if not already there is handled by ProtectedRoute usually, 
        // but removing token triggers state change.
    };

    // Intercept 401s to auto-logout (Global Safety)
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );
        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    const login = (newToken: string, userData: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
    };

    const isAdmin = user?.role === 'admin' || user?.role === 'SUPER_ADMIN';

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
