import React, { useState, useContext, createContext, useMemo, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

const STORAGE_KEY = 'apex_cart';

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('No se pudo cargar el carrito desde localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.warn('No se pudo guardar el carrito en localStorage:', error);
        }
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        if (!product || quantity <= 0) return;

        setCart((prevCart) => {
            const itemInCart = prevCart.find((item) => item.id === product.id);
            if (itemInCart) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = useMemo(
        () => cart.reduce((total, item) => total + (item.quantity || 0), 0),
        [cart]
    );
    const totalPrice = useMemo(
        () => cart.reduce((total, item) => total + ((item.precio || item.price || 0) * (item.quantity || 0)), 0),
        [cart]
    );

    const getCartQuantity = () => totalItems;
    const getCartTotal = () => totalPrice;

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice,
                getCartQuantity,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};