import styles from "./header.module.css";
// import { Link } from "react-router-dom";

function Header({ onVistaChange }) {
  return (
    <header className={styles.header}>
      <div><img className={styles.logo} src="./src/assets/logo.png" alt="Logotipo de la empresa" /></div>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <button className={styles.link} onClick={() => onVistaChange('inicio')}>Inicio</button>
          </li>
          <li>
            <button className={styles.link} onClick={() => onVistaChange('productos')}>Productos</button>
          </li>
          <li>
            <button className={styles.link} onClick={() => onVistaChange('destacados')}>Destacados</button>
          </li>
          <li>
            <button className={styles.link} onClick={() => onVistaChange('alta')}>Alta de Productos</button>
          </li>
           <li>
            <button className={styles.link} onClick={() => onVistaChange('Mi carrito')}>Mi carrito <img className={styles.carrito} src="./src/assets/carrito.png" alt="carrito" /></button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
