import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/data";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_charges = 15.00;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [token, setToken] = useState('dummytoken');
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select material you want");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] = quantity;
      }
    }
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            const product = products.find((product) => product._id === items);
            totalAmount += product.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const value = {
    currency,
    delivery_charges,
    navigate,
    products,
    token,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setToken,
    addToCart,
    getCartCount,
    cartItems,
    setCartItems,
    updateQuantity,
    getCartAmount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
