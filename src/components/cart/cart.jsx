import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaCreditCard, FaShoppingBasket, FaTag, FaTimes } from 'react-icons/fa';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Cart = () => {
    const { cart, clearCart, removeFromCart, getCartTotal, totalPrice, discount, discountAmount, finalPrice, coupon, applyCoupon, removeCoupon } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const [couponLoading, setCouponLoading] = useState(false);

    const validateCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError('Por favor ingresa un código de cupón');
            return;
        }

        setCouponLoading(true);
        setCouponError('');

        try {
            const q = query(collection(db, 'cupones'), where('codigo', '==', couponCode.trim().toUpperCase()));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setCouponError('Cupón no encontrado');
                return;
            }

            const couponDoc = querySnapshot.docs[0];
            const couponData = couponDoc.data();

            if (!couponData.activo) {
                setCouponError('Este cupón no está activo');
                return;
            }

            if (couponData.cantidadUsada >= couponData.cantidadDisponible) {
                setCouponError('Este cupón ya ha sido utilizado completamente');
                return;
            }

            // Aplicar cupón
            applyCoupon(couponData);
            setCouponCode('');
            setCouponError('');

            // Incrementar contador de uso
            const newCantidadUsada = (couponData.cantidadUsada || 0) + 1;
            await updateDoc(doc(db, 'cupones', couponDoc.id), {
                cantidadUsada: newCantidadUsada
            });

        } catch (error) {
            console.error('Error validando cupón:', error);
            setCouponError('Error al validar el cupón. Intenta nuevamente.');
        } finally {
            setCouponLoading(false);
        }
    };

    if (!cart || cart.length === 0) {
        return (
            <div style={{ padding: 20 }}>
                <h1><FaShoppingBasket /> El carrito está vacío</h1>
                <p>Agrega productos para continuar la compra.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Carrito de Compras</h1>

            <div style={{ display: 'grid', gap: 12 }}>
                {cart.map((item) => (
                    <div key={item.id} className="cart-item" style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            {item.imagen && (
                                <img src={item.imagen} alt={item.nombre} width={80} height={80} />
                            )}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: 0 }}>{item.nombre}</h3>
                                <p style={{ margin: '6px 0' }}>Precio unitario: ${item.precio}</p>
                                <p style={{ margin: '6px 0' }}>Cantidad: {item.quantity}</p>
                                <p style={{ margin: '6px 0' }}>Subtotal: ${item.precio * item.quantity}</p>
                            </div>
                            <div>
                                <button onClick={() => removeFromCart(item.id)} style={{ background: '#e53e3e', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6 }}><FaTrash /> Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <hr style={{ margin: '20px 0' }} />

            {/* Sección de cupones */}
            <div style={{ background: '#f7fafc', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                <h3 style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}><FaTag /> Cupón de Descuento</h3>
                
                {coupon ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#d1fae5', padding: 12, borderRadius: 6 }}>
                        <div>
                            <strong style={{ color: '#065f46' }}>{coupon.codigo}</strong>
                            <span style={{ color: '#065f46', marginLeft: 8 }}>- {coupon.descuento}% de descuento</span>
                        </div>
                        <button onClick={removeCoupon} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <FaTimes /> Eliminar
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: 8 }}>
                        <input
                            type="text"
                            placeholder="Ingresa tu código de cupón"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, textTransform: 'uppercase' }}
                        />
                        <button 
                            onClick={validateCoupon} 
                            disabled={couponLoading}
                            style={{ padding: '8px 16px', background: '#3182ce', color: 'white', border: 'none', borderRadius: 6, cursor: couponLoading ? 'not-allowed' : 'pointer' }}
                        >
                            {couponLoading ? 'Validando...' : 'Aplicar'}
                        </button>
                    </div>
                )}
                
                {couponError && <p style={{ color: '#e53e3e', margin: '8px 0 0 0', fontSize: '0.9rem' }}>{couponError}</p>}
            </div>

            {/* Resumen de precios */}
            <div style={{ background: '#f7fafc', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Subtotal:</span>
                    <span>${totalPrice}</span>
                </div>
                {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#059669' }}>
                        <span>Descuento ({discount}%):</span>
                        <span>-${discountAmount}</span>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', borderTop: '1px solid #e2e8f0', paddingTop: 8 }}>
                    <span>Total a pagar:</span>
                    <span>${finalPrice}</span>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={clearCart} style={{ padding: '8px 12px', borderRadius: 6 }}>Vaciar Carrito</button>
                    <button onClick={() => alert('Proceder a pago (no implementado)')} style={{ padding: '8px 12px', background: '#3182ce', color: 'white', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6 }}><FaCreditCard /> Pagar</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;