import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_charges,
    products,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  return (
    <div>
      <div className="bg-primary mb-16">
        <form className="max-padd-container py-10">
          <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
            <div className="flex flex-1 flex-col gap-3 text-[95%]">
              <Title
                title1={"Delivery"}
                title2={"Information"}
                titleStyles={"h3"}
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
              </div>
              <input
                name="email"
                type="text"
                placeholder="Email"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none"
              />
              <input
                name="phone"
                type="text"
                placeholder="Contact Number"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none"
              />
              <input
                name="Street"
                type="text"
                placeholder="Street"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
                <input
                  name="Province"
                  type="text"
                  placeholder="Province"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
                />
                <input
                  name="District"
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
                  <div
                    onClick={() => setMethod("cod")}
                    className={`${
                      method === "cod" ? "btn-dark" : "btn-white"
                    } !py-1 text-xs cursor-pointer`}
                  >
                    Pay Half on Delivery
                  </div>
                  <div
                    onClick={() => setMethod("stripe")}
                    className={`${
                      method === "stripe" ? "btn-dark" : "btn-white"
                    } !py-1 text-xs cursor-pointer`}
                  >
                    Strip
                  </div>
                </div>
              </div>
              <div>
                <button type="submit" className="btn-secondary">
                  Place Order
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
