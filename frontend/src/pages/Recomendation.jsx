import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { FaFileUpload, FaRegCheckCircle, FaSearch } from "react-icons/fa";
import { FaCircleNotch } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeDown = (delay) => {
  return {
    hidden: { opacity: 0, y: -100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
};

const fadeUp = (delay) => {
  return {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
};

const fadeRight = (delay) => {
  return {
    hidden: { opacity: 0, x: -100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
};

const fadeLeft = (delay) => {
  return {
    hidden: { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
};

const Recommendations = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [loading, setLoading] = useState(false);

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
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setRecommendations(response.data.recommendations);
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
      <div className="bg-primary mb-16 bg-cb bg-cover bg-center bg-no-repeat w-full">
        <div className="max-padd-container py-10">
          <h1 className="h1 font-[300] capitalize max-w-[722px] text-black">
            <motion.span
              variants={fadeLeft(0.6)}
              initial="hidden"
              whileInView="show"
              className="font-bold text-blue-900"
            >
              AI{" "}
            </motion.span>
            <motion.span
              variants={fadeDown(0.8)}
              initial="hidden"
              whileInView="show"
            >
              Product
            </motion.span>

            <motion.span
              variants={fadeDown(0.9)}
              initial="hidden"
              whileInView="show"
            >
              {" "}
              Recommendations
            </motion.span>
          </h1>
          <div className="flex items-center gap-x-4 mt-6 mb-10">
            <motion.div
              variants={fadeUp(1.2)}
              initial="hidden"
              whileInView="show"
              className="relative inline-block"
            >
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
            </motion.div>
            <motion.button
              variants={fadeUp(1.4)}
              initial="hidden"
              whileInView="show"
              onClick={fetchRecommendations}
              disabled={!selectedImage}
              className={`${
                selectedImage
                  ? "bg-blue-700 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              } rounded-full text-white p-2 flexCenter gap-x-2 capitalize`}
            >
              Search <FaSearch />
            </motion.button>
            <motion.button
              variants={fadeUp(1.6)}
              initial="hidden"
              whileInView="show"
              onClick={handleReset}
              disabled={!selectedImage}
              className={`${
                selectedImage
                  ? "bg-slate-500 hover:bg-slate-400"
                  : "bg-gray-300 cursor-not-allowed"
              } rounded-full text-white p-2 flexCenter gap-x-2 capitalize`}
            >
              Reset <FaCircleNotch />
            </motion.button>
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
                <div className="grid grid-cols-3 gap-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className=" rounded">
                      <img
                        src={rec}
                        alt={`Recommendation ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
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
