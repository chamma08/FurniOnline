import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { FaFileUpload, FaRegCheckCircle, FaSearch } from "react-icons/fa";
import { FaCircleNotch } from "react-icons/fa6";
import { motion } from "framer-motion";

const Recommendations = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Set the maximum number of products to display
  const maxProductsToShow = 3;

  const generateDummyProducts = (images) => {
    return images.map((img, index) => ({
      _id: index,
      name: `Furniture ${index + 1}`,
      description: `This is a description for product ${index + 1}`,
      price: (Math.random() * 100 + 50).toFixed(2),
      image: [img],
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      setUploadedImageURL(URL.createObjectURL(file));
    }
  };

  const fetchRecommendations = async () => {
    if (!selectedImage) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/recommend",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const aiOutput = response.data.recommendations;
      // Limit the number of images to maxProductsToShow
      const limitedImages = aiOutput.slice(0, maxProductsToShow);
      const dummyProducts = generateDummyProducts(limitedImages);
      setRecommendations(dummyProducts);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setRecommendations([]);
    setUploadedImageURL("");
  };

  // Animation variants for better UI feedback
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-primary mb-8 bg-rc bg-cover bg-center bg-no-repeat w-full py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Animated Title */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 tracking-tight">
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-secondary"
              >
                AI
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {" Product Recommendations"}
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Upload a photo of furniture you like and we'll find similar products for you instantly.
            </motion.p>
          </motion.div>
          
          {/* Upload Section */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mb-10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="relative inline-block w-full sm:w-auto">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                  aria-label="Upload an image"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center gap-2 px-6 py-3 ${
                    selectedImage ? "bg-green-500" : "bg-blue-500"
                  } text-white rounded-xl cursor-pointer font-medium shadow-md w-full sm:w-auto`}
                >
                  {selectedImage ? (
                    <>
                      <FaRegCheckCircle size={20} />
                      <span>Uploaded</span>
                    </>
                  ) : (
                    <>
                      <FaFileUpload size={20} />
                      <span>Upload Image</span>
                    </>
                  )}
                </motion.div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchRecommendations}
                disabled={!selectedImage}
                className={`${
                  selectedImage
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                } flex items-center justify-center gap-2 rounded-xl text-white px-6 py-3 font-medium shadow-md w-full sm:w-auto`}
              >
                Find Similar <FaSearch />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                disabled={!selectedImage}
                className={`${
                  selectedImage
                    ? "bg-gray-700 hover:bg-gray-800"
                    : "bg-gray-300 cursor-not-allowed"
                } flex items-center justify-center gap-2 rounded-xl text-white px-6 py-3 font-medium shadow-md w-full sm:w-auto`}
              >
                Reset <FaCircleNotch />
              </motion.button>
            </div>

            {/* Image Preview Section */}
            {uploadedImageURL && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-xl font-medium mb-4 text-gray-800">Your Uploaded Image</h2>
                <div className="border-2 border-blue-100 p-2 rounded-xl shadow-md">
                  <img
                    src={uploadedImageURL}
                    alt="Uploaded furniture"
                    className="h-48 w-48 object-cover rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">We'll find products similar to this image</p>
              </motion.div>
            )}
          </motion.div>
          
          {/* Loading Indicator */}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-transparent border-t-teal-400 rounded-full animate-spin"></div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Finding similar products...</p>
            </motion.div>
          )}

          {/* Recommendations Section */}
          {!loading && recommendations.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-12"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="text-green-600">Recommended</span> Products
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {recommendations.map((product, index) => (
                  <motion.div
                    key={product._id}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-bold shadow-md">
                        ${product.price}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-all duration-300 shadow-md">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Empty State */}
          {!loading && !recommendations.length && !uploadedImageURL && (
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center py-8"
            >
              <div className="bg-blue-50 rounded-xl p-8 max-w-md mx-auto">
                <FaFileUpload className="text-blue-500 text-5xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Upload an image to get started</h3>
                <p className="text-gray-600">We'll use AI to find similar furniture products that match your style.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recommendations;