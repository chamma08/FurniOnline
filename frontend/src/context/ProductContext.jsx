import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";


export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const delivery_charges = 15.0;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  // Fetch products from MongoDB
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const [userId, setUserId] = useState(null);

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
    try {
      const decoded = jwtDecode(storedToken);
      setUserId(decoded.id); // Extract userId from token
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  fetchProducts();
}, []);


  // Load cart from local storage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId, sizes) => {
    if (!sizes) {
      toast.error("Please select material you want");
      return;
    }
  
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }
  
    let cartData = structuredClone(cartItems);
  
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][sizes] = (cartData[itemId][sizes] || 0) + 1;
  
    setCartItems(cartData);
  
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { userId, itemId, sizes }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
          setCartItems(structuredClone(cartData)); 
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart");
      }
    }
  };
  

  // Get total items count in cart
  const CartCount = () => {
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

  // Update quantity of an item
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };

  // Get total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            const product = products.find((product) => product._id === items);
            if (product) {
              totalAmount += product.price * cartItems[items][item];
            }
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
    products,
    loading,
    cartItems,
    addToCart,
    CartCount,
    updateQuantity,
    getCartAmount,
    setToken,
    token,
    backendUrl,
  };

  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
