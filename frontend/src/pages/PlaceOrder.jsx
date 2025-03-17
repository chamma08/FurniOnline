import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const PlaceOrder = () => {
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_charges,
    products,
    backendUrl,
  } = useContext(ProductContext);
  const [method, setMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    zipcode: "",
    district: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.sizes = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      if (orderItems.length === 0) {
        toast.error("Your cart is empty. Add items before placing an order.");
        return;
      }
      let userId = null;
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          userId = decodedToken._id || decodedToken.userId || decodedToken.id;
          if (!userId) throw new Error("Invalid user session.");
        } catch (error) {
          toast.error("Invalid user session. Please log in again.");
          return;
        }
      } else {
        toast.error("User is not authenticated.");
        return;
      }
      if (!backendUrl) {
        toast.error("Backend URL is not set. Please try again later.");
        return;
      }
      let orderData = {
        userId,
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charges,
        method,
      };
      if (method === "stripe") {
        const response = await axios.post(
          `${backendUrl}/api/order/stripe`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          const { session_url } = response.data;
          window.location.href = session_url;
        } else {
          toast.error(response.data.message || "Failed to place order.");
        }
      } else {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 201) {
          toast.success("Order successfully placed!");
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(response.data.message || "Failed to place order.");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-primary mb-16">
        <form onSubmit={onSubmitHandler} className="max-padd-container py-10">
          <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
            <div className="flex flex-1 flex-col gap-3 text-[95%]">
              <Title
                title1={"Delivery"}
                title2={"Information"}
                titleStyles={"h3"}
              />
              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.firstName}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.lastName}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
              </div>
              <input
                onChange={onChangeHandler}
                value={formData.email}
                name="email"
                type="email"
                placeholder="Email"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none"
              />
              <input
                onChange={onChangeHandler}
                value={formData.phone}
                name="phone"
                type="tel"
                placeholder="Contact Number"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none"
              />
              <input
                onChange={onChangeHandler}
                value={formData.street}
                name="street"
                type="text"
                placeholder="Street"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none"
              />
              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.city}
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.province}
                  name="province"
                  type="text"
                  placeholder="Province"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
              </div>
              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.zipcode}
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.district}
                  name="district"
                  type="text"
                  placeholder="District"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <CartTotal />
              <div className="my-6">
                <h3 className="bold-20 mb-5">
                  Payment{" "}
                  <span className="text-secondary font-medium">Methods</span>
                </h3>
                <div className="flex gap-3">
                <div className="flex gap-3">
                  <div onClick={() => setMethod("cod")} className={`${method === "cod" ? "btn-dark" : "btn-white"} !py-1 text-xs cursor-pointer`}>Cash on Delivery</div>
                  <div onClick={() => setMethod("stripe")} className={`${method === "stripe" ? "btn-dark" : "btn-white"} !py-1 text-xs cursor-pointer`}>Stripe</div>
                </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn-secondary hover:bg-transparent w-full hover:text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order" : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceOrder;
