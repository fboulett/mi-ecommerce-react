import React, { useState, useEffect } from 'react';
// Importaciones clave de Firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import styles from './productosNacionales.module.css';

const formatPrice = (value) => {
    if (value == null) return '-';
    const amount = Number(value);
    if (Number.isNaN(amount)) return `$ ${value}`;
    return `$ ${amount.toLocaleString('es-AR')}`;
};

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { currentUser } = useAuth();
    const nombre = product.nombre || product.name || 'Producto';
    const precio = product.precio ?? product.price ?? 0;
    const imagen = product.imagen || product.image || product.img || '';
    const stock = product.stock ?? product.cantidad ?? product.quantity ?? 0;

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            nombre,
            precio,
            imagen,
            stock,
        }, 1);
    };

    return (
        <article className={styles.card}>
            {imagen && <img src={imagen} alt={nombre} className={styles.cardImage} />}
            <div className={styles.cardBody}>
                <h2>{nombre}</h2>
                <p className={styles.code}>Codigo Artículo: {product.id}</p>
                {currentUser ? <p>{formatPrice(precio)}</p> : <p>Inicia sesión para ver el precio</p>}
                <p>Stock: {stock}</p>
                <button
                    type="button"
                    className={styles.button}
                    onClick={handleAddToCart}
                    disabled={stock <= 0}
                >
                    {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                </button>
            </div>
        </article>
    );
};

const ProductosNacionales = () => {
    // Estado para guardar los productos que traigamos de la DB
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function fetchProductos() {
            setCargando(true);
            setError(null);
            try {
                const COLLECTION_CANDIDATES = ['productos', '0', 'productos_nacionales', 'productosNacionales'];
                const allDocs = [];
                for (const COLLECTION_NAME of COLLECTION_CANDIDATES) {
                    try {
                        const productosDB = collection(db, COLLECTION_NAME);
                        const resp = await getDocs(productosDB);
                        if (!resp.empty) {
                            const lista = resp.docs.map((doc) => {
                                const raw = doc.data() || {};
                                const normalized = {};
                                Object.keys(raw).forEach((k) => {
                                    normalized[k.toLowerCase()] = raw[k];
                                });
                                normalized.id = (normalized.id ?? raw.id) || doc.id;
                                return { ...normalized, _raw: raw, _collection: COLLECTION_NAME, _docId: doc.id };
                            });
                            allDocs.push(...lista);
                            console.log(`Cargados ${lista.length} productos desde colección: ${COLLECTION_NAME}`);
                        } else {
                            console.log(`Colección ${COLLECTION_NAME} vacía o inexistente.`);
                        }
                    } catch (innerErr) {
                        console.warn(`No se pudo leer colección ${COLLECTION_NAME}:`, innerErr.message || innerErr);
                    }
                }
                // Unificar por id (prioriza id numérico o doc id)
                const byId = new Map();
                for (const doc of allDocs) {
                    const key = String(doc.id || doc._docId);
                    if (!byId.has(key)) byId.set(key, doc);
                }
                const listaUnica = Array.from(byId.values());
                if (mounted) setProductos(listaUnica);
                console.log('Productos unificados cargados desde Firestore:', listaUnica);
            } catch (err) {
                console.error('Error al leer productos de Firestore:', err);
                if (mounted) setError(err.message || 'Error al cargar productos');
            } finally {
                if (mounted) setCargando(false);
            }
        }
        fetchProductos();
        return () => { mounted = false; };
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez

    if (cargando) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner} aria-label="Cargando productos" />
                    <p className={styles.loadingText}>Cargando productos...</p>
                </div>
            </div>
        );
    }

    if (error) return <p>Error cargando productos: {error}</p>;

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h1 className={styles.title}>Productos Nacionales</h1>
            </div>
            {productos.length === 0 && <p>No hay productos disponibles.</p>}
            <div className={styles.grid}>
                {productos.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                ))}
            </div>
        </div>
    );
};
export default ProductosNacionales;