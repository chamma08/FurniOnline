import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, sizes } = req.body;

    if (!userId || !itemId || !sizes) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Fetch user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is initialized

    // Update cartData
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][sizes] = (cartData[itemId][sizes] || 0) + 1;

    // Update user in database
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, sizes, quantity } = req.body;

    // Validate required fields
    if (!userId || !itemId || sizes === undefined || quantity === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Fetch user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Ensure cartData is initialized
    let cartData = userData.cartData || {};

    // Ensure cartData[itemId] is initialized
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Update the quantity for the specified size
    cartData[itemId][sizes] = quantity;

    // Save the updated cartData
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addToCart, getUserCart, updateCart };
