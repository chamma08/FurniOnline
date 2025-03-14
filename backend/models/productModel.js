import mongoose from "mongoose";

const poductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemId: { type: String, required: false },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  popular: { type: Boolean },
  date: { type: Number, required: true },
});

const productModel = mongoose.models.Product || mongoose.model("Product", poductSchema);

export default productModel;