import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext(); // export kaldırdık

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem) => {
    setCartItems((prevCart) => [...prevCart, {
      ...cartItem,
      quantity:cartItem.quantity ? cartItem.quantity :1,
    },
  ]);
  };

  const removeFromCart = (itemId) => 
  {
    const filteredCartItems = cartItems.filter((cartItem) =>

      {

        return cartItem._id !== itemId;
      });
    
    setCartItems(filteredCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart,removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export { CartContext }; // export'u sona aldık
export default CartProvider;

