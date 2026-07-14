import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProfilePage() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <section style={{ padding: '2rem' }}>
            <h2>Perfil</h2>
            <p>Estás autenticado con: {currentUser?.email}</p>
            <button type="button" onClick={handleLogout} style={{ marginTop: '1rem' }}>
                Cerrar sesión
            </button>
        </section>
    );
}
