import React, { useState, useEffect } from "react";
import styles from "./Productos.module.css";

function Productos({ Mensaje }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    fetch("/data/Productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información de los productos");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);
  if (cargando) {
    return <p>Cargando productos, por favor espere...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <h1>{Mensaje}</h1>
      <div className={styles.productos}>
        {productos.map((producto) => (
          <div key={producto.id} className={styles.producto}>
            <h2>{producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} width="150" />
            <p>Precio: ${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
