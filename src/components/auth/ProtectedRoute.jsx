import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <p style={{ padding: '2rem' }}>Verificando acceso...</p>;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
