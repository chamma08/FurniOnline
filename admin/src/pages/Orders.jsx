import React from "react";
import { useState } from "react";
import { TfiPackage } from "react-icons/tfi";
import { backend_url, currency } from "../App";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token || typeof token !== "string") {
      return alert("Invalid or missing token. Please login again.");
    }
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/status",
        {
          orderId,
          status: e.target.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status == 200) {
        await fetchOrders();
        toast.success(response.data.message);
      } else {
        console.log(error);
        toast.error(response.data.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="px-2 sm:px-8 sm:mt-14 mt-4">
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] gap-4 items-start p-3 text-gray-700 bg-white rounded-lg"
          >
            <div className="flexCenter">
              <TfiPackage className="text-3xl text-secondary" />
            </div>
            <div>
              <div className="flex items-start gap-1">
                <div className="medium-14">Items:</div>
                <div className="flex flex-col relative top-0.5">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p key={index}>
                          {item.name} x {item.quantity}{" "}
                          <span>"{item.sizes}"</span>,
                        </p>
                      );
                    } else {
                      return (
                        <p key={index}>
                          {item.name} x {item.quantity}{" "}
                          <span>"{item.sizes}"</span>,
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
              <p className="medium-14">
                <span className="text-tertiary">Name: </span>{" "}
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <p className="medium-14">
                <span className="text-tertiary">Address: </span>{" "}
                <span>{order.address.street + ","}</span>{" "}
                <span>
                  {
                    /* order.address.city + "," + */ order.address.district +
                      " District," +
                      order.address.province +
                      " Province " +
                      order.address.zipcode +
                      ","
                  }{" "}
                </span>
              </p>
              <p className="medium-14">
                <span className="text-tertiary">Phone: </span>{" "}
                {order.address.phone}
              </p>
            </div>
            <div>
              <p className="text-sm">Total: {order.items.length}</p>
              <p className="text-sm">Method: {order.paymentMethod}</p>
              <p className="text-sm">
                Payment: {order.payment ? "Done" : "Pending"}
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm font-semibold">
              {currency}
              {order.amount}
            </p>
            <select onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="text-sm font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
