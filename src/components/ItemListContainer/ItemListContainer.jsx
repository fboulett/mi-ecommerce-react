import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import styles from './ItemListContainer.module.css';

export function ItemListContainer({ Mensaje }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);

    fetch("https://api.escuelajs.co/api/v1/products")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los productos");
        }
        return respuesta.json();
      })
      .then((data) => {
        setProductos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p className={styles.subtitulo}>Cargando productos...</p>;
  }

  if (error) {
    return <p className={styles.subtitulo}>{error}</p>;
  }

  return (
    <div>
      <h2 className={styles.subtitulo}>{Mensaje}</h2>
      <div className={styles.productos}>
        <ItemList productos={productos} />
      </div>
    </div>
  );
}
