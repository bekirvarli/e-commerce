import { createContext, useState } from "react";
import PropTypes from "prop-types";


export const CartContext = createContext(); 
//  export default CartContext;


const CartProvider = ({children}) => 
{
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (cartItem) => {
    // setCartItems ([...cartItems,product]);
      setCartItems((prevCart) => [...prevCart,cartItem]);
    
  };
    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                
            }}
            >
            {children}
        </CartContext.Provider>
        
    )

}


CartProvider.propTypes ={
    children : PropTypes.node,
}
export default CartProvider;
