import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartContextType, CartItem } from '../interfaces/interfacesShop';



const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId: number) => {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={ { cart, addToCart, removeFromCart } }>
      { children }
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
