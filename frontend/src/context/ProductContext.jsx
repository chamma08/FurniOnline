import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const delivery_charges = 15.0;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

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
      toast.error("Please select a material.");
      return;
    }
  
    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }
  
    let cartData = { ...cartItems };
  
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
          toast.success("Item added to cart.");
        } else {
          toast.error(response.data.message);
          setCartItems({ ...cartItems }); // Revert changes if API fails
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item.");
        setCartItems({ ...cartItems }); // Revert on error
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
  const updateQuantity = (itemId, sizes, quantity) => {
    let cartData = { ...cartItems };
  
    if (cartData[itemId] && cartData[itemId][sizes]) {
      cartData[itemId][sizes] = quantity;
    }
  
    setCartItems(cartData);
  
    if (token) {
      axios
        .post(
          `${backendUrl}/api/cart/update`,
          { userId, itemId, sizes, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          if (!response.data.success) {
            toast.error(response.data.message);
            setCartItems({ ...cartItems });
          }
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
          toast.error("Failed to update cart.");
          setCartItems({ ...cartItems }); 
        });
    }
  };
  

  
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

  const getUserCart = async () => {
    if (!userId) {
      return;
    }

    try {
      const response = await axios.get(
        `${backendUrl}/api/cart/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItems(response.data.cart);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to fetch cart");
    }
  }

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
    getUserCart,
    userId,
    navigate,
    setCartItems
  };

  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
