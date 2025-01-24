import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

const Cart = () => {
  const { products, currency, cartItems, getCartCount } = useContext(ShopContext);
  return (
    <div>
      
    </div>
  )
}

export default Cart
