import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'shreestone_cart_items_v1';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      // Sanitize stored items to ensure no undefined tiles crash the UI
      return parsed.filter(item => item && item.tile && item.tile._id);
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Synchronize cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  // Add tile to cart (defaulting to 100 sq.ft minimum architectural box order)
  const addToCart = (tile, quantitySqFt = 100) => {
    if (!tile || !tile._id) return;
    const price = Number(tile.pricePerSqFt || tile.price || 185);

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.tile && item.tile._id === tile._id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantitySqFt: (updated[existingIndex].quantitySqFt || 0) + quantitySqFt
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: tile._id,
            tile,
            quantitySqFt: Math.max(50, quantitySqFt),
            pricePerSqFt: price
          }
        ];
      }
    });

    // Automatically slide open the drawer for immediate feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (tileId) => {
    setCartItems(prev => prev.filter(item => item && item.tile && item.tile._id !== tileId));
  };

  const updateQuantity = (tileId, quantitySqFt) => {
    if (quantitySqFt <= 0) {
      removeFromCart(tileId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item && item.tile && item.tile._id === tileId
          ? { ...item, quantitySqFt: Math.max(50, quantitySqFt) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Calculate cart summary metrics
  const { cartTotalSqFt, cartTotalPrice } = useMemo(() => {
    let totalSqFt = 0;
    let totalPrice = 0;
    for (const item of cartItems) {
      if (!item || !item.tile) continue;
      const qty = Number(item.quantitySqFt) || 0;
      const prc = Number(item.pricePerSqFt || item.tile.pricePerSqFt || item.tile.price || 185);
      totalSqFt += qty;
      totalPrice += qty * prc;
    }
    return {
      cartTotalSqFt: totalSqFt,
      cartTotalPrice: totalPrice
    };
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalSqFt,
    cartTotalPrice,
    isCartOpen,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
