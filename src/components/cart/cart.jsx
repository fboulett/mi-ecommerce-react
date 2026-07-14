import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaCreditCard, FaShoppingBasket } from 'react-icons/fa';

const Cart = () => {
    const { cart, clearCart, removeFromCart, getCartTotal } = useCart();

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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Total a pagar: ${getCartTotal()}</h2>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={clearCart} style={{ padding: '8px 12px', borderRadius: 6 }}>Vaciar Carrito</button>
                    <button onClick={() => alert('Proceder a pago (no implementado)')} style={{ padding: '8px 12px', background: '#3182ce', color: 'white', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6 }}><FaCreditCard /> Pagar</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;