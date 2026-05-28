import { useState } from 'react';

export function Item({ nombre, stock, precio, imagen }) {

  const [cantidad, setCantidad] = useState(0);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };
  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div>
      <h3>{nombre}</h3>
      {imagen && <img src={imagen} alt={nombre} width="150" />}
      <p>Precio: ${precio}</p>
      <p>Stock disponible: {stock}</p>
      <button onClick={decrementar}>-</button>
      <p>{cantidad}</p>
      <button onClick={incrementar}>+</button>
    </div>
  );
}