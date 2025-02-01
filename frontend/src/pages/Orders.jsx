import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Footer from "../components/Footer";

const Orders = () => {
  const { products, currency, quantity } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const data = products.slice(0, 5);
    setOrderData(data);
  }, [products]);

  return (
    <div>
      <div className="bg-primary mb-16">
        <div className="max-padd-container py-10">
          <Title title1={"Order"} title2={"List"} titleStyles={"h3"} />
          {orderData.map((item, i) => (
            <div key={i} className="bg-white p-2 rounded-lg mt-3">
              <div className="text-gray-700 flex flex-col gap-4">
                <div className="flex gap-x-6 w-full">
                  <div className="flex gap-6">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="sm:w-[77px] rounded-lg"
                    />
                  </div>
                  <div className="block w-full">
                    <h5 className="h5 capitalize line-clamp-1">{item.name}</h5>
                    <div className="flexBetween flex-wrap">
                      <div>
                        <div className="flex items-center gap-x-2 sm:gap-x-3">
                          <div className="flexCenter gap-x-2">
                            <h5 className="medium-14">Price:</h5>
                            <p>
                              {currency}
                              {item.price}
                            </p>
                          </div>
                          <div className="flexCenter gap-x-2">
                            <h5 className="medium-14">Quantity:</h5>
                            <p>{item.quantity}</p>
                          </div>
                          <div className="flexCenter gap-x-2">
                            <h5 className="medium-14">Meterial:</h5>
                            <p>{item.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <h5 className="medium-14">Date:</h5>
                          <p>{new Date(item.date).toDateString()}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <h5 className="medium-14">Payment</h5>
                          <p>{"dummy"}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex items-center gap-2">
                          <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                          <p>{item.status}</p>
                        </div>
                        <button className="btn-secondary !p-1.5 !py-1 !text-sm">
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
