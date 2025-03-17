import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "usd";
const deliveryCharges = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    if (!userId || items.length === 0 || !amount || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cart: {} });

    res.status(201).json({ message: "Order Placed Successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    if (!userId || items.length === 0 || !amount || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },

        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: error.message || "Something went wrong " });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const orders = await orderModel.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    await orderModel
      .findByIdAndUpdate(orderId, { status }, { new: true })
      .exec();
    res.status(200).json({ message: "Order status updated" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  if (!orderId || !success) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ message: "Order status updated" });
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ message: "Order deleted" });
    }
  } catch (error) {
    console.error("Error verifying stripe payment:", error);
    res.status(500).json({ message: error.message || "Something went wrong " });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
