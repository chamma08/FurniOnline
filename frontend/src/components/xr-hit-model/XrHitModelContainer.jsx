import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import ColorPicker from "../ColorPicker";
import { useState } from "react";
import DimensionControls from "../DimensionControls";

const XrHitModelContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modelPath = queryParams.get("model");
  const [color, setColor] = useState("#ffffff");
  const [dimensions, setDimensions] = useState({
    width: 1,
    height: 1,
    depth: 1,
  });
  const productPrice = parseFloat(queryParams.get("price")) || 100;
  const [price, setPrice] = useState(productPrice);

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const calculatePrice = (dimensions, basePrice) => {
    const volume = dimensions.width * dimensions.height * dimensions.depth;
    return basePrice * volume;
  };

  const handleDimensionChange = (dimension, value) => {
    const newDimensions = { ...dimensions, [dimension]: value };
    setDimensions(newDimensions);

    // Calculate and update the price
    const newPrice = calculatePrice(newDimensions, productPrice);
    setPrice(newPrice);
  };

  // Reset dimensions to default values
  const handleReset = () => {
    setDimensions({ width: 1, height: 1, depth: 1 });
    setPrice(productPrice); // Reset price to the base product price
  };

  // Save the current price (you can replace this with your save logic)
  const handleSave = () => {
    alert(`Price saved: $${price.toFixed(2)}`);
    // Add your save logic here (e.g., send the price to a backend or store it in state)
  };

  return (
    <>
      <div className="max-padd-container bg-primary rounded-xl p-3 mt-5 mb-6">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Furniture 3D View </h1>
          <hr className="border-1 border-[2px] border-wid border-black my-3 w-24" />
        </div>

        <div>
          <p className="text-lg font-semibold mb-4 mt-4 text-center">Want to Customize Furniture, Customize it from below</p>
        </div>

        <DimensionControls
          dimensions={dimensions}
          onDimensionChange={handleDimensionChange}
        />
        <p className="text-lg font-semibold mt-4">Price: ${price.toFixed(2)}</p>
        <div className="flex  gap-4 mt-8">
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 w-[170px] rounded-2xl hover:bg-gray-600 transition-colors"
          >
            Reset Dimensions
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-[170px] hover:bg-blue-600 transition-colors"
          >
            Save Price
          </button>
        </div>
        <Canvas
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "40px",
          }}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 3], fov: 30 }}
        >
          <XR>
            <XrHitModel
              modelPath={modelPath}
              color={color}
              dimensions={dimensions}
            />
          </XR>
        </Canvas>
        <ColorPicker onColorChange={handleColorChange} />
        <div className="flex justify-center">
          <ARButton
            sessionInit={{ requiredFeatures: ["hit-test"] }}
            style={{
              backgroundColor: "black",
              border: "none",
              borderRadius: "20px",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "semibold",
              color: "#ffff",
              marginBottom: "20px",
            }}
          >
            Enter AR
          </ARButton>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default XrHitModelContainer;
