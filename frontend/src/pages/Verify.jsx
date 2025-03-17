import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } =
    useContext(ProductContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${backendUrl}/api/order/verifystripe`,
        { success, orderId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error verifying payment");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>Verify</div>;
};

export default Verify;
