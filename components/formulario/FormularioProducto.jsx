
import React from 'react';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio }) {

  const formStyle = {};
  return (
    <form style={formStyle} onSubmit={manejarEnvio}>
      <h3>Agregar Nuevo Producto</h3>
      <div>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          placeholder="Ej: Teclado Mecánico"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Precio: $</label>
        <input
          type="number"
          placeholder="Ej: 95"
          name="precio"
          value={datosForm.precio}
          onChange={manejarCambio}
        />
      </div>
      {/* Continuamos con los otros 2 atributos del formulario. */}
      <button type="submit">Guardar Producto</button>
    </form>
  );
}