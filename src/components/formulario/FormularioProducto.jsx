
import React from 'react';
import styles from './formulario.module.css';
import { FaSave, FaEdit, FaTimes, FaTrash, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, errors = {}, deleteId, manejarDeleteChange, deleteAmount, manejarDeleteAmountChange, manejarEliminar, manejarAumentar, modoEdicion = false, manejarCargarProducto, cancelarEdicion, isLoading = false }) {

  return (
    <form className={styles.form} onSubmit={manejarEnvio} noValidate>
      <h3 className={styles.title}>Agregar Nuevo Producto</h3>

      <div className={styles.field}>
        <label>Categoría:</label>
        <input
          type="text"
          placeholder="Ej: Almacén"
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
        />
        {errors.categoria && <div className={styles.error}>{errors.categoria}</div>}
      </div>

      <div className={styles.field}>
        <label>Id:</label>
        <input
          type="number"
          placeholder="Ej: 7"
          name="id"
          value={datosForm.id}
          onChange={manejarCambio}
        />
        {errors.id && <div className={styles.error}>{errors.id}</div>}
      </div>

      <div className={styles.field}>
        <label>Imagen (URL):</label>
        <input
          type="text"
          placeholder="Ej: https://...jpg"
          name="imagen"
          value={datosForm.imagen}
          onChange={manejarCambio}
        />
        {errors.imagen && <div className={styles.error}>{errors.imagen}</div>}
      </div>

      <div className={styles.field}>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          placeholder="Ej: Galletitas Oreo Clásica 351g"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
        />
        {errors.nombre && <div className={styles.error}>{errors.nombre}</div>}
      </div>

      <div className={styles.field}>
        <label>Precio: $</label>
        <input
          type="number"
          placeholder="Ej: 2600"
          name="precio"
          value={datosForm.precio}
          onChange={manejarCambio}
        />
        {errors.precio && <div className={styles.error}>{errors.precio}</div>}
      </div>

      <div className={styles.field}>
        <label>Stock:</label>
        <input
          type="number"
          placeholder="Ej: 220"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
        />
        {errors.stock && <div className={styles.error}>{errors.stock}</div>}
      </div>

      <div className={styles.editActions}>
        <button type="button" className={styles.secondaryButton} onClick={manejarCargarProducto} disabled={isLoading}>
          {isLoading ? 'Procesando...' : <><FaEdit /> {modoEdicion ? 'Cargar producto' : 'Cargar para editar'}</>}
        </button>
        {modoEdicion && (
          <button type="button" className={styles.cancelButton} onClick={cancelarEdicion} disabled={isLoading}>
            <FaTimes /> Cancelar edición
          </button>
        )}
      </div>
      <p className={styles.helperText}>
        {modoEdicion
          ? 'Estás editando un producto existente. Modifica los campos y guarda para actualizarlo.'
          : 'Completa el formulario para crear un producto nuevo o carga uno por ID para editarlo.'}
      </p>

      <div className={styles.deleteSection}>
        <h4 className={styles.deleteTitle}>Eliminar / Reducir stock</h4>
        <div className={styles.deleteRow}>
          <input
            className={styles.deleteInput}
            type="number"
            placeholder="ID a eliminar"
            name="deleteId"
            value={deleteId || ''}
            onChange={manejarDeleteChange}
          />
          <input
            className={styles.deleteInput}
            type="number"
            placeholder="Cantidad a eliminar"
            name="deleteAmount"
            value={deleteAmount || ''}
            onChange={manejarDeleteAmountChange}
          />
          <button type="button" className={styles.deleteButton} onClick={manejarEliminar} disabled={isLoading}>
            {isLoading ? '...' : <><FaTrash /> Eliminar</>}
          </button>
          <button type="button" className={styles.increaseButton} onClick={manejarAumentar} disabled={isLoading}>
            {isLoading ? '...' : <><FaPlusCircle /> Aumentar</>}
          </button>
        </div>
      </div>
      <button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? 'Procesando...' : <><FaSave /> {modoEdicion ? 'Actualizar Producto' : 'Guardar Producto'}</>}
      </button>
      {isLoading && <div className={styles.spinner} aria-label="Cargando" />}
    </form>
  );
}