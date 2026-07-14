import React, { useState } from 'react';
import { FormularioProducto } from '../formulario/FormularioProducto';
import { addDoc, collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export function FormularioContainer() {

    const [datosForm, setDatosForm] = useState({
        categoria: '',
        id: '',
        imagen: '',
        nombre: '',
        precio: '',
        stock: '',
    });
    const [errors, setErrors] = useState({});
    const [deleteId, setDeleteId] = useState('');
    const [deleteAmount, setDeleteAmount] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoDocId, setProductoDocId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };
    const manejarDeleteChange = (evento) => {
        setDeleteId(evento.target.value);
    };
    const manejarDeleteAmountChange = (evento) => {
        setDeleteAmount(evento.target.value);
    };
    const resetForm = () => {
        setDatosForm({ categoria: '', id: '', imagen: '', nombre: '', precio: '', stock: '' });
        setErrors({});
    };
    const manejarCargarProducto = async () => {
        if (!datosForm.id || isNaN(Number(datosForm.id)) || Number(datosForm.id) <= 0) {
            alert('Ingrese un ID numérico válido para cargar el producto a editar.');
            return;
        }

        setIsLoading(true);
        try {
            const q = query(collection(db, 'productos'), where('id', '==', Number(datosForm.id)));
            const snap = await getDocs(q);

            if (snap.empty) {
                alert('No se encontró ningún producto con ese ID para editar.');
                setModoEdicion(false);
                setProductoDocId('');
                return;
            }

            const producto = snap.docs[0].data();
            setDatosForm({
                categoria: producto.categoria || '',
                id: producto.id?.toString() || '',
                imagen: producto.imagen || '',
                nombre: producto.nombre || '',
                precio: producto.precio?.toString() || '',
                stock: producto.stock?.toString() || '',
            });
            setProductoDocId(snap.docs[0].id);
            setModoEdicion(true);
            setErrors({});
        } catch (error) {
            console.error('Error cargando producto para editar: ', error);
            alert('Ocurrió un error al cargar el producto para editar.');
        } finally {
            setIsLoading(false);
        }
    };
    const cancelarEdicion = () => {
        resetForm();
        setModoEdicion(false);
        setProductoDocId('');
    };
    const isValidURL = (str) => {
        try {
            // URL constructor throws on invalid urls
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };
    const validate = (data) => {
        const errs = {};
        if (!data.categoria || !data.categoria.toString().trim()) errs.categoria = 'La categoría es requerida.';
        if (!data.id || isNaN(Number(data.id)) || Number(data.id) <= 0) errs.id = 'Id debe ser un número entero positivo.';
        if (!data.imagen || !isValidURL(data.imagen)) errs.imagen = 'Ingrese una URL válida para la imagen.';
        if (!data.nombre || !data.nombre.toString().trim()) errs.nombre = 'El nombre es requerido.';
        if (data.precio === '' || isNaN(Number(data.precio)) || Number(data.precio) < 0) errs.precio = 'Ingrese un precio válido (>= 0).';
        if (data.stock === '' || isNaN(Number(data.stock)) || Number(data.stock) < 0) errs.stock = 'Ingrese un stock válido (>= 0).';
        return errs;
    };
    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        const validation = validate(datosForm);
        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            return;
        }
        setErrors({});

        setIsLoading(true);

        const productoData = {
            categoria: datosForm.categoria || '',
            id: Number(datosForm.id) || 0,
            imagen: datosForm.imagen || '',
            nombre: datosForm.nombre || '',
            precio: Number(datosForm.precio) || 0,
            stock: Number(datosForm.stock) || 0,
        };

        try {
            if (modoEdicion && productoDocId) {
                await updateDoc(doc(db, 'productos', productoDocId), productoData);
                alert('Producto actualizado correctamente.');
            } else {
                const docRef = await addDoc(collection(db, 'productos'), productoData);
                alert('Producto agregado con documento ID: ' + docRef.id);
            }
            resetForm();
            setModoEdicion(false);
            setProductoDocId('');
        } catch (error) {
            console.error('Error guardando documento: ', error);
            alert('Ocurrió un error al guardar el producto.');
        } finally {
            setIsLoading(false);
        }
    };

    const manejarEliminar = async () => {
        if (!deleteId || isNaN(Number(deleteId))) {
            alert('Ingrese un ID numérico válido para eliminar.');
            return;
        }
        if (!deleteAmount || isNaN(Number(deleteAmount)) || Number(deleteAmount) <= 0) {
            alert('Ingrese una cantidad numérica válida (> 0) para eliminar.');
            return;
        }
        setIsLoading(true);
        const idNum = Number(deleteId);
        const qty = Number(deleteAmount);
        try {
            const q = query(collection(db, 'productos'), where('id', '==', idNum));
            const snap = await getDocs(q);
            if (snap.empty) {
                alert('No se encontró ningún producto con ese ID en la colección productos.');
                return;
            }
            const results = [];
            for (const d of snap.docs) {
                const data = d.data() || {};
                const currentStock = Number(data.stock || 0);
                if (qty >= currentStock) {
                    await deleteDoc(doc(db, 'productos', d.id));
                    results.push({ docId: d.id, action: 'deleted' });
                } else {
                    const newStock = currentStock - qty;
                    await updateDoc(doc(db, 'productos', d.id), { stock: newStock });
                    results.push({ docId: d.id, action: 'decremented', newStock });
                }
            }
            const deletedCount = results.filter(r => r.action === 'deleted').length;
            const decCount = results.filter(r => r.action === 'decremented').length;
            alert(`Acción completada. Eliminados: ${deletedCount}, Stock decrementado en: ${decCount}`);
            setDeleteId('');
            setDeleteAmount('');
        } catch (err) {
            console.error('Error eliminando/actualizando producto:', err);
            alert('Ocurrió un error al procesar la eliminación. Revisa la consola.');
        } finally {
            setIsLoading(false);
        }
    };
    const manejarAumentar = async () => {
        if (!deleteId || isNaN(Number(deleteId))) {
            alert('Ingrese un ID numérico válido para aumentar stock.');
            return;
        }
        if (!deleteAmount || isNaN(Number(deleteAmount)) || Number(deleteAmount) <= 0) {
            alert('Ingrese una cantidad numérica válida (> 0) para aumentar.');
            return;
        }
        setIsLoading(true);
        const idNum = Number(deleteId);
        const qty = Number(deleteAmount);
        try {
            const q = query(collection(db, 'productos'), where('id', '==', idNum));
            const snap = await getDocs(q);
            if (snap.empty) {
                alert('No se encontró ningún producto con ese ID en la colección productos.');
                return;
            }
            const results = [];
            for (const d of snap.docs) {
                const data = d.data() || {};
                const currentStock = Number(data.stock || 0);
                const newStock = currentStock + qty;
                await updateDoc(doc(db, 'productos', d.id), { stock: newStock });
                results.push({ docId: d.id, action: 'incremented', newStock });
            }
            const incCount = results.filter(r => r.action === 'incremented').length;
            alert(`Stock aumentado en ${incCount} documento(s).`);
            setDeleteId('');
            setDeleteAmount('');
        } catch (err) {
            console.error('Error aumentando stock:', err);
            alert('Ocurrió un error al aumentar stock. Revisa la consola.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            errors={errors}
            deleteId={deleteId}
            manejarDeleteChange={manejarDeleteChange}
            deleteAmount={deleteAmount}
            manejarDeleteAmountChange={manejarDeleteAmountChange}
            manejarEliminar={manejarEliminar}
            manejarAumentar={manejarAumentar}
            modoEdicion={modoEdicion}
            isLoading={isLoading}
            manejarCargarProducto={manejarCargarProducto}
            cancelarEdicion={cancelarEdicion}
        />
    );
}
