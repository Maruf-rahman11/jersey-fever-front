import { useEffect, useState } from "react";
import CartContext from "./CartContext";


const getInitialCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (shoe) => {
    setCart(prev => {
      return [...prev, { ...shoe}];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item._id === id && item.size === size)
      )
    );
  };
  

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
