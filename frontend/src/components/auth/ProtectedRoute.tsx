import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redirect to login page, but save the intended check (optional)
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};
