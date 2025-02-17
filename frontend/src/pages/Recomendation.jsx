import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import { FaCircleNotch } from "react-icons/fa6";

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
        "http://127.0.0.1:5000/recommend",
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
      <div className="bg-primary mb-16 bg-rc bg-cover bg-center bg-no-repeat w-full">
        <div className="max-padd-container py-10">
          <h1 className="h1 font-[300] capitalize max-w-[722px] text-black">
            <span className="font-bold text-blue-900">AI </span>Product
            Recommendations
          </h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 mt-8"
          />
          <div className="flex items-center gap-x-4 mt-6 mb-10">
            <button
              onClick={fetchRecommendations}
              className="bg-blue-700 rounded-full hover:bg-blue-600 text-white p-2 flexCenter gap-x-2 capitalize"
            >
              Search <FaSearch />
            </button>
            <button
              onClick={handleReset}
              className="bg-slate-500 rounded-full hover:bg-slate-400 text-white p-2 flexCenter gap-x-2 capitalize"
            >
              Reset <FaCircleNotch />
            </button>
          </div>

          {uploadedImageURL && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Uploaded Image</h2>
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
                <h2 className="text-3xl font-semibold mb-6 h1">Our <span className="text-green-600">Recommendations</span></h2>
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
