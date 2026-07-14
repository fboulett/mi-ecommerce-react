import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export function Item({ id, nombre, precio, stock, imagen }) {
  // Creamos el objeto producto a partir de las props
  const producto = { id, nombre, precio, stock, imagen };
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart(); // Traemos la función del contexto

  const handleDecrease = () => {
    setCantidad((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setCantidad((prev) => Math.min(prev + 1, stock || prev + 1));
  };

  const handleAddToCart = () => {
    if (cantidad <= 0) return;
    addToCart(producto, cantidad);
    alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
  };
  return (
    <div className="card-producto">
      <img src={producto.imagen} alt={producto.nombre} width={100}
        height={100} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      {/* Incorporamos el detalle del stock */}
      <p>Stock disponible: {stock}</p>
      <Link to={`/producto/${producto.id}`}>Ver detalle</Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <button type="button" onClick={handleDecrease} style={{ width: 32, height: 32 }}>-</button>
        <input
          type="number"
          min="1"
          max={stock || 999}
          value={cantidad}
          onChange={(e) => setCantidad(Math.max(1, Number(e.target.value) || 1))}
          style={{ width: 60, textAlign: 'center' }}
        />
        <button type="button" onClick={handleIncrease} style={{ width: 32, height: 32 }}>+</button>
      </div>
      <button onClick={handleAddToCart} style={{ marginTop: 12 }}>
        Agregar {cantidad} al carrito
      </button>
    </div>
  );
}
export default Item;