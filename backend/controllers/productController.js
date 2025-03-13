import productModel from "../models/productModel.js";
import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, popular } =
      req.body;

    //extracting images if provided
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    //uploading images to cloudinary or use default image
    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    } else {
      imagesUrl = [
        "https://res.cloudinary.com/dxkufsejm/image/upload/v1632783273/default-image.jpg",
      ];
    }
    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      popular: popular === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeProducts = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, removeProducts, singleProduct, listProducts };
