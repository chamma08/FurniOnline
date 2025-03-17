import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import Footer from "../components/Footer";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Orders = () => {
  const { products, currency, quantity, backendUrl, token } =
    useContext(ProductContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const decoded = jwtDecode(token);
      const userId = decoded?.id;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Full API Response:", response.data); // Debugging log

      if (response.status === 200 && Array.isArray(response.data)) {
        let allOrdersItem = [];

        response.data.forEach((order) => {
          order.items?.forEach((item) => {
            allOrdersItem.push({
              ...item,
              date: order.date,
              status: order.status,
              paymentMethod: order.paymentMethod,
              payment: order.payment,
            });
          });
        });

        console.log("Processed Orders:", allOrdersItem); // Debugging log
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

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
                            <h5 className="medium-14">Material:</h5>
                            <p>{item.sizes}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <h5 className="medium-14">Date:</h5>
                          <p>{new Date(item.date).toDateString()}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <h5 className="medium-14">Payment</h5>
                          <p>{item.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex items-center gap-2">
                          <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                          <p>{item.status}</p>
                        </div>
                        <button onClick={loadOrderData} className="btn-secondary !p-1.5 !py-1 !text-sm">
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
