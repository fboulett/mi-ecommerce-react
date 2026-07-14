import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { getCartQuantity } = useCart();
  const { currentUser } = useAuth();
  const totalItems = getCartQuantity();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1 className={styles.title}>APEX STORE</h1>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li><Link to="/" className={styles.link}>Inicio</Link></li>
          <li><Link to="/productos" className={styles.link}>Productos</Link></li>
          <li>
            <Link to="/carrito" className={styles.link}>
              Carrito 🛒 {totalItems > 0 && <span>({totalItems})</span>}
            </Link>
          </li>
          <li>
            <Link to="/formulario" className={styles.link}>Editor</Link>
          </li>
          <li>
            {currentUser ? (
              <Link to="/perfil" className={`${styles.link} ${styles.profileLink}`}>Perfil</Link>
            ) : (
              <Link to="/login" className={styles.link}>Ingresar</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;