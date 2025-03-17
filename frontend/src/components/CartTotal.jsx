import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { ProductContext } from "../context/ProductContext";

const CartTotal = () => {
  const { currency, getCartAmount, delivery_charges } = useContext(ProductContext);

  const subtotal = getCartAmount();
  const totalDelivery = subtotal === 0 ? 0 : delivery_charges;
  const totalAmount = subtotal + totalDelivery;

  return (
    <section className="w-full">
      <Title title1={"Cart"} title2={"Total"} titleStyles={"h3"} />
      <div>
        <div className="flexBetween pt-3">
          <h5 className="h5">Subtotal</h5>
          <p>
            {currency}
            {subtotal.toFixed(2)}
          </p>
        </div>
        <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
        <div className="flexBetween pt-3">
          <h5 className="h5">Delivery Charges</h5>
          <p>
            {currency}
            {totalDelivery.toFixed(2)}
          </p>
        </div>
        <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
        <div className="flexBetween pt-3">
          <h5 className="h5">Total</h5>
          <p>
            {currency}
            {totalAmount.toFixed(2)}
          </p>
        </div>
        <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
      </div>
    </section>
  );
};

export default CartTotal;
