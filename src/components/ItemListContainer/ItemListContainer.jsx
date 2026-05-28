import { ItemList } from "../ItemList/Itemlist";
import styles from './ItemListContainer.module.css';

export function ItemListContainer({ Mensaje }) {
  const productos = [
    { id: '0128', nombre: 'Notebook Pro', precio: 12000, stock: 15, imagen: "/images/NotebookPro.jpeg" },
    { id: '0144', nombre: 'Monitor Curvo', precio: 450000, stock: 25, imagen: "/images/MonitorCurvo.jpg" },
    { id: '0145', nombre: 'Teclado Mecánico', precio: 15000, stock: 50, imagen: "/images/TecladoMecanico.jpg" },
  ];
  return (
    <div>

      <h2 className={styles.subtitulo}>{Mensaje}</h2>
      <div className={styles.productos}>

        <ItemList productos={productos} />
      </div>
    </div>
  );
}