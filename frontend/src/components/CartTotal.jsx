import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, getCartAmount, delivery_charges } = useContext(ShopContext);

  return (
    <section className="w-full">
      <Title title1={"Cart"} title2={"Total"} titleStyles={"h3"} />
      <div>
        <div className="flexBetween pt-3 ">
          <h5 className="h5">Subtotal</h5>
          <p>
            {currency}
            {getCartAmount()}
          </p>
        </div>
        <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
        <div className="flexBetween pt-3">
          <h5 className="h5">Delivery Charges</h5>
          <p>
            {getCartAmount() === 0 ? currency + "0.00" : currency + delivery_charges}
          </p>
        </div>
        <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
        <div className="flexBetween pt-3">
          <h5 className="h5">Total</h5>
          <p>
            {currency}
            {getCartAmount() === 0 ? "0.00" : getCartAmount() + delivery_charges}
          </p>
        </div>
        <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
      </div>
    </section>
  );
};

export default CartTotal;
