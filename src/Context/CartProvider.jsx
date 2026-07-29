import { useEffect, useState } from "react";
import CartContext from "./CartContext";


const getInitialCart = () => {
  return JSON.parse(localStorage.getItem("myCart")) || [];
};

const CartProvider = ({ children }) => {
  const [myCart, setMyCart] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(myCart));
  }, [myCart]);

  const addToCart = (shoe) => {
    setMyCart(prev => {
      return [...prev, { ...shoe}];
    });
  };

  const removeFromCart = (id, size) => {
    setMyCart((prev) =>
      prev.filter(
        (item) => !(item._id === id && item.size === size)
      )
    );
  };
  

  const clearCart = () => setMyCart([]);

  return (
    <CartContext.Provider value={{ myCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
