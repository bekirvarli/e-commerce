import { useContext, useState } from "react";
import { message } from "antd";
import { CartContext } from "../../context/CartProvider";


const CartCoupon = () => {
    const [messageApi, contextHolder] = message.useMessage();
const {cartItems,setCartItems} = useContext(CartContext);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
  const [couponCode, setCouponCode] = useState("")
  const applyCoupon = async ()=> {

    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);
      if(!res.ok)
      {
        return  messageApi.warning("wadsdfdsf")
        
      }
      const data = await res.json();
      const discountPercent = data.discountPercent;
      const updateCartItems = cartItems.map((item) => {
        const updatePrice = item.price * (1- discountPercent /100);
        return {...item,price:updatePrice};
      });
      setCartItems(updateCartItems);
      messageApi.success(`${couponCode} kupon kodu başarıyla uygulandı.`)
    } catch (error) {
      console.log(error);
      
      
    }
    

  }
  return (
    <>
    {contextHolder}
    <div className="actions-wrapper">
      <div className="coupon">
        <input type="text" className="input-text" placeholder="Coupon code" onChange= {(e) => setCouponCode(e.target.value)} value = {couponCode}/>
        <button className="btn" type="button" onClick={applyCoupon}>Apply Coupon</button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
    </>
    
  );
};

export default CartCoupon;
