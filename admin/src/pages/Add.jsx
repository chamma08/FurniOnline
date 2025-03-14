import React, { useState } from "react";
import upload_icon from "../assets/upload_icon.png";
import axios from "axios";

import { backend_url } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Chair");
  const [subCategory, setSubCategory] = useState("Living Room");
  const [popular, setPopular] = useState(false);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const onSubmitHandler = async (e) => {
    console.log("Backend URL:", backend_url);

    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("popular", popular);

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      console.log("Sizes before sending:", sizes);
      console.log(
        name,
        description,
        sizes,
        price,
        category,
        subCategory,
        popular
      );

      console.log(formData);

      const response = await axios.post(
        `${backend_url}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        toast.success("Product added successfully");
        setName("");
        setDescription("");
        setSizes([]);
        setPrice("");
        setCategory("Chair");
        setSubCategory("Living Room");
        setPopular(false);
        setImages([null, null, null, null]);
      } else {
        toast.error("Product could not be added");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="px-2 sm:px-8">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-3 medium-14 lg:w-[777px]"
      >
        <div className="w-full">
          <h5 className="h5">Product Name</h5>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="write.."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg"
          />
        </div>
        <div className="w-full">
          <h5 className="h5">Product Description</h5>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            rows={5}
            placeholder="write.."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg"
          />
        </div>
        <div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-row gap-4">
              <div>
                <h5 className="h5">Category</h5>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="max-w-20 px-3 py-2 text-gray-30 ring-1 ring-slate-900/5 bg-white rounded"
                >
                  <option value="Chair">Chair</option>
                  <option value="Sofa">Sofa</option>
                  <option value="">Category 3</option>
                </select>
              </div>
              <div>
                <h5 className="h5">Sub Category</h5>
                <select
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subCategory}
                  className="max-w-32 px-3 py-2 text-gray-30 ring-1 ring-slate-900/5 bg-white rounded"
                >
                  <option value="Living Room">Living Room</option>
                  <option value="">Category 2</option>
                  <option value="">Category 3</option>
                </select>
              </div>
            </div>
            <div>
              <h5 className="h5">Price ($)</h5>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="1000"
                value={price}
                className="px-3 py-1.5 ring-1 max-w-20 ring-slate-900/10 rounded bg-white mt-1"
              />
            </div>
          </div>
        </div>
        <div>
          <h5 className="h5">Product Material</h5>
          <div className="flex gap-3 mt-2">
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Wood")
                    ? prev.filter((item) => item !== "Wood")
                    : [...prev, "Wood"]
                )
              }
            >
              <span
                className={`${
                  sizes.includes("Wood") ? "bg-tertiary text-white" : "bg-white"
                } text-gray-30 rounded ring-1 ring-slate-900/5 px-3 py-1 cursor-pointer`}
              >
                Wood
              </span>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
            >
              <span
                className={`${
                  sizes.includes("M") ? "bg-tertiary text-white" : "bg-white"
                } text-gray-30 rounded ring-1 ring-slate-900/5 px-3 py-1 cursor-pointer`}
              >
                Metal
              </span>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
            >
              <span
                className={`${
                  sizes.includes("L") ? "bg-tertiary text-white" : "bg-white"
                } text-gray-30 rounded ring-1 ring-slate-900/5 px-3 py-1 cursor-pointer`}
              >
                Plastic
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                src={image ? URL.createObjectURL(image) : upload_icon}
                alt="upload"
                className="cursor-pointer w-16 h-16 aspect-square object-cover ring-1 ring-slate-900/5 rounded-lg"
              />
              <input
                type="file"
                id={`image${index + 1}`}
                className="hidden"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </label>
          ))}
        </div>
        <div className="flexStart gap-2 my-2">
          <input
            onChange={(e) => setPopular((prev) => !prev)}
            checked={popular}
            type="checkbox"
            id="popular"
          />
          <label htmlFor="popular">Popular</label>
        </div>
        <button type="submit" className="btn-dark mt-3 max-w-44 sm:w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
