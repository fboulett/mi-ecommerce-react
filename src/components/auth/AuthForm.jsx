import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthForm.module.css';

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password);
            }

            navigate('/productos');
        } catch (err) {
            setError(err.message || 'No se pudo completar la operación.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.authContainer}>
            <div className={styles.card}>
                <h2>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
                <p className={styles.subtitle}>
                    {isLogin
                        ? 'Accede para gestionar tu cuenta y compras.'
                        : 'Crea una cuenta para disfrutar de una experiencia más completa.'}
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label} htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className={styles.input}
                    />

                    <label className={styles.label} htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        minLength="6"
                        className={styles.input}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Procesando...' : isLogin ? 'Entrar' : 'Registrarme'}
                    </button>
                </form>

                <button
                    type="button"
                    className={styles.toggle}
                    onClick={() => setIsLogin((prev) => !prev)}
                >
                    {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                </button>
            </div>
        </section>
    );
}
