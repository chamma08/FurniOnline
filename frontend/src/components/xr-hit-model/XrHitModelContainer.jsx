import { Canvas } from "@react-three/fiber";
import { ARButton, XR, Controllers } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import ColorPicker from "../ColorPicker";
import { useState, useEffect } from "react";
import DimensionControls from "../DimensionControls";

const XrHitModelContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modelPath = queryParams.get("model");
  const [color, setColor] = useState("");
  const [dimensions, setDimensions] = useState({
    width: 1,
    height: 1,
    depth: 1,
  });
  const productPrice = parseFloat(queryParams.get("price")) || 100;
  const [price, setPrice] = useState(productPrice);
  const [isInARMode, setIsInARMode] = useState(false);

  // Define available colors for AR mode
  const availableColors = [
    "#ff0000", // Red
    "#00ff00", // Green
    "#0000ff", // Blue
    "#ffff00", // Yellow
    "#ff00ff", // Magenta
    "#00ffff", // Cyan
    "#ffffff", // White
    "#000000", // Black
    "#8b4513", // Brown
    "#808080", // Gray
  ];

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleDimensionChange = (dimension, value) => {
    let newDimensions = { ...dimensions };
    let scaleFactor = 0.2;

    let change = value - newDimensions[dimension];

    // Update the changed dimension
    newDimensions[dimension] = value;

    // Adjust other two dimensions proportionally
    if (dimension === "height") {
      newDimensions.width += change * scaleFactor;
      newDimensions.depth += change * scaleFactor;
    } else if (dimension === "width") {
      newDimensions.height += change * scaleFactor;
      newDimensions.depth += change * scaleFactor;
    } else if (dimension === "depth") {
      newDimensions.height += change * scaleFactor;
      newDimensions.width += change * scaleFactor;
    }

    // Ensure values are not negative
    newDimensions.width = Math.max(newDimensions.width, 0.1);
    newDimensions.height = Math.max(newDimensions.height, 0.1);
    newDimensions.depth = Math.max(newDimensions.depth, 0.1);

    setDimensions(newDimensions);

    // Recalculate price
    const newPrice = calculatePrice(newDimensions, productPrice);
    setPrice(newPrice);
  };

  const calculatePrice = (dimensions, basePrice) => {
    const volume = dimensions.width * dimensions.height * dimensions.depth;
    return basePrice * volume;
  };

  const handleReset = () => {
    setDimensions({ width: 1, height: 1, depth: 1 });
    setPrice(productPrice);
  };

  const handleSave = () => {
    alert(`Price saved: $${price.toFixed(2)}`);
  };

  // Handle AR session start
  const handleARSessionStart = () => {
    setIsInARMode(true);

    // Create a minimal AR mode indicator
    const arIndicator = document.createElement("div");
    arIndicator.id = "ar-mode-indicator";
    arIndicator.style.position = "fixed";
    arIndicator.style.top = "20px";
    arIndicator.style.left = "50%";
    arIndicator.style.transform = "translateX(-50%)";
    arIndicator.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    arIndicator.style.color = "white";
    arIndicator.style.padding = "10px 20px";
    arIndicator.style.borderRadius = "20px";
    arIndicator.style.fontWeight = "bold";
    arIndicator.style.zIndex = "9999";
    arIndicator.textContent = "AR Mode Active";

    document.body.appendChild(arIndicator);

    // Hide ALL UI elements when entering AR mode
    hideAllUIElements(true);
  };

  // Handle AR session end
  const handleARSessionEnd = () => {
    setIsInARMode(false);

    // Remove the AR indicator
    const arIndicator = document.getElementById("ar-mode-indicator");
    if (arIndicator) {
      arIndicator.remove();
    }

    // Show UI elements again
    hideAllUIElements(false);
  };

  // Function to hide/show all UI elements
  const hideAllUIElements = (hide) => {
    // List of selectors for elements that should be hidden in AR mode
    const elementsToHide = [
      ".max-padd-container",
      "header",
      "nav",
      "footer",
      "#root > div > *:not(.canvas-container)", // Hide all direct children of root except canvas
    ];

    elementsToHide.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el && !el.classList.contains("ar-controls")) {
          el.style.display = hide ? "none" : "";
        }
      });
    });

    // Special handling for the canvas container to ensure it's full screen in AR mode
    const canvasContainer = document.querySelector(".canvas-container");
    if (canvasContainer) {
      if (hide) {
        canvasContainer.style.position = "fixed";
        canvasContainer.style.top = "0";
        canvasContainer.style.left = "0";
        canvasContainer.style.width = "100vw";
        canvasContainer.style.height = "100vh";
        canvasContainer.style.zIndex = "999";
      } else {
        canvasContainer.style.position = "";
        canvasContainer.style.top = "";
        canvasContainer.style.left = "";
        canvasContainer.style.width = "";
        canvasContainer.style.height = "";
        canvasContainer.style.zIndex = "";
      }
    }
  };

  // Add a wrapper div around Canvas for better handling
  useEffect(() => {
    // Add canvas-container class to the Canvas parent for targeting
    const canvasElement = document.querySelector("canvas");
    if (canvasElement && canvasElement.parentElement) {
      canvasElement.parentElement.classList.add("canvas-container");
    }
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen max-padd-container mb-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
            {/* Header Section with glass effect */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-3 sm:px-6 py-4 sm:py-8 text-white">
              <div className="flex flex-col items-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center">
                  Furniture Visualizer
                </h1>
                <div className="h-1 w-16 sm:w-24 bg-white/50 rounded-full my-2 sm:my-4"></div>
                <p className="text-base sm:text-lg text-blue-100 max-w-2xl text-center">
                  Customize and visualize your furniture in real-time using our
                  AR technology
                </p>
              </div>
            </div>

            {/* Canvas and Controls Container */}
            <div className="flex flex-col lg:flex-row p-2 sm:p-4">
              {/* 3D Canvas - Takes more space */}
              <div className="canvas-container w-full lg:w-2/3 p-2 sm:p-4">
                <div className="bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden shadow-inner border border-gray-200">
                  <Canvas
                    style={{
                      width: "100%",
                      height: "350px",
                      minHeight: "650px",
                      maxHeight: "600px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    className="sm:h-[450px] md:h-[500px] lg:h-[600px]"
                    dpr={[1, 2]}
                    camera={{
                      position: [0, 0.5, 2],
                      fov: 45,
                      near: 0.1,
                      far: 1000,
                    }}
                    shadows
                  >
                    <XR
                      onSessionStart={handleARSessionStart}
                      onSessionEnd={handleARSessionEnd}
                    >
                      <Controllers />
                      <XrHitModel
                        modelPath={modelPath}
                        color={color}
                        dimensions={dimensions}
                        availableColors={availableColors}
                      />
                    </XR>
                  </Canvas>
                </div>

                {/* AR Button - Prominent placement */}
                <div className="mt-3 sm:mt-6 flex justify-center">
                  <ARButton
                    sessionInit={{
                      requiredFeatures: ["hit-test"],
                      optionalFeatures: ["dom-overlay"],
                      domOverlay: { root: document.body },
                    }}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 sm:py-3 px-4 sm:px-8 rounded-full text-base sm:text-lg font-medium shadow-md sm:shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 focus:ring-4 focus:ring-purple-500/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    View in Your Space
                  </ARButton>
                </div>
              </div>

              {/* Controls Section - Sidebar */}
              <div className="w-full lg:w-1/3 p-2 sm:p-4 mt-4 lg:mt-0">
                <div className="bg-gray-100 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                    Customize Your Furniture
                  </h2>

                  {/* Dimensions Controls */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm9 6a1 1 0 100-2H6a1 1 0 100 2h8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Dimensions
                    </h3>
                    <DimensionControls
                      dimensions={dimensions}
                      onDimensionChange={handleDimensionChange}
                    />
                  </div>

                  {/* Color Controls */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-14a2 2 0 00-2 2v5h10V4a2 2 0 00-2-2h-6zm2 12a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Colors
                    </h3>
                    <ColorPicker onColorChange={handleColorChange} />
                  </div>

                  {/* Price Display */}
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-blue-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        Current Price:
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-blue-700">
                        ${price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-4">
                    <button
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm sm:text-base"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Reset
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm sm:text-base"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Save Price
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Callouts */}
            <div className="bg-slate-50 px-3 sm:px-6 py-6 sm:py-8 border-t border-gray-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex flex-col items-center text-center p-3 sm:p-4">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-full mb-3 sm:mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    View in Your Space
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                    Use AR technology to see how the furniture looks in your
                    actual space
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-3 sm:p-4">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-full mb-3 sm:mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Custom Colors
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                    Change colors to match your home's decor and personal style
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-3 sm:p-4">
                  <div className="bg-indigo-100 p-2 sm:p-3 rounded-full mb-3 sm:mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Precise Dimensions
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                    Adjust size to ensure a perfect fit in your desired space
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default XrHitModelContainer;