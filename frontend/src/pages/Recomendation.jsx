import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { FaFileUpload, FaRegCheckCircle, FaSearch } from "react-icons/fa";
import { FaCircleNotch } from "react-icons/fa6";
import { motion } from "framer-motion";

const text = "AI Product Recommendations";

const Recommendations = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [loading, setLoading] = useState(false);

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
      const dummyProducts = generateDummyProducts(aiOutput);
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

  return (
    <div>
      <div className="bg-primary mb-16 bg-rc bg-cover bg-center bg-no-repeat w-full">
        <div className="max-padd-container py-10">
          <h1 className="h1 font-[300] capitalize max-w-[722px] text-black">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }} 
                className={index < 2 ? "font-bold text-blue-900" : ""} 
              >
                {char}
              </motion.span>
            ))}
          </h1>
          <div className="flex items-center gap-x-4 mt-6 mb-10">
            <di className="relative inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div
                className={`flex items-center gap-2 px-4 py-2 ${
                  selectedImage ? "bg-green-600" : "bg-[#1b7c8d]"
                } text-white rounded-full cursor-pointer`}
              >
                {selectedImage ? (
                  <>
                    <FaRegCheckCircle size={20} />
                    <span>Uploaded</span>
                  </>
                ) : (
                  <>
                    <FaFileUpload size={20} />
                    <span>Upload</span>
                  </>
                )}
              </div>
            </di>
            <button
              onClick={fetchRecommendations}
              disabled={!selectedImage}
              className={`${
                selectedImage
                  ? "bg-blue-700 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              } rounded-full text-white p-2 flexCenter gap-x-2 capitalize`}
            >
              Search <FaSearch />
            </button>
            <button
              onClick={handleReset}
              disabled={!selectedImage}
              className={`${
                selectedImage
                  ? "bg-slate-500 hover:bg-slate-400"
                  : "bg-gray-300 cursor-not-allowed"
              } rounded-full text-white p-2 flexCenter gap-x-2 capitalize`}
            >
              Reset <FaCircleNotch />
            </button>
          </div>

          {uploadedImageURL && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2 bg-white rounded-xl w-1/2 justify-center items-center sm:bg-transparent sm:border-black text-center sm:text-left p-2">
                Uploaded Image
              </h2>
              <div className="rounded">
                <img
                  src={uploadedImageURL}
                  alt="Uploaded"
                  className="max-h-[180px] max-w-[180px] object-cover rounded-xl"
                />
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : (
            recommendations.length > 0 && (
              <div className="mt-4 text-center">
                <h2 className="text-3xl font-semibold mb-6 h1">
                  Our <span className="text-green-600">Recommendations</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {recommendations.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-3xl shadow p-4"
                    >
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover mb-2 rounded-xl"
                      />
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-gray-700">{product.description}</p>
                        <p className="font-bold mt-2">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recommendations;
