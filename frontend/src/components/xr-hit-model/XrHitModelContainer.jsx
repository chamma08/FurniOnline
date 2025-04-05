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
    "#808080"  // Gray
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
    const arIndicator = document.createElement('div');
    arIndicator.id = 'ar-mode-indicator';
    arIndicator.style.position = 'fixed';
    arIndicator.style.top = '20px';
    arIndicator.style.left = '50%';
    arIndicator.style.transform = 'translateX(-50%)';
    arIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    arIndicator.style.color = 'white';
    arIndicator.style.padding = '10px 20px';
    arIndicator.style.borderRadius = '20px';
    arIndicator.style.fontWeight = 'bold';
    arIndicator.style.zIndex = '9999';
    arIndicator.textContent = 'AR Mode Active';
    
    document.body.appendChild(arIndicator);
    
    // Hide ALL UI elements when entering AR mode
    hideAllUIElements(true);
  };
  
  // Handle AR session end
  const handleARSessionEnd = () => {
    setIsInARMode(false);
    
    // Remove the AR indicator
    const arIndicator = document.getElementById('ar-mode-indicator');
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
      '.max-padd-container',
      'header', 
      'nav',
      'footer',
      '#root > div > *:not(.canvas-container)'  // Hide all direct children of root except canvas
    ];
    
    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el && !el.classList.contains('ar-controls')) {
          el.style.display = hide ? 'none' : '';
        }
      });
    });
    
    // Special handling for the canvas container to ensure it's full screen in AR mode
    const canvasContainer = document.querySelector('.canvas-container');
    if (canvasContainer) {
      if (hide) {
        canvasContainer.style.position = 'fixed';
        canvasContainer.style.top = '0';
        canvasContainer.style.left = '0';
        canvasContainer.style.width = '100vw';
        canvasContainer.style.height = '100vh';
        canvasContainer.style.zIndex = '999';
      } else {
        canvasContainer.style.position = '';
        canvasContainer.style.top = '';
        canvasContainer.style.left = '';
        canvasContainer.style.width = '';
        canvasContainer.style.height = '';
        canvasContainer.style.zIndex = '';
      }
    }
  };

  // Add a wrapper div around Canvas for better handling
  useEffect(() => {
    // Add canvas-container class to the Canvas parent for targeting
    const canvasElement = document.querySelector('canvas');
    if (canvasElement && canvasElement.parentElement) {
      canvasElement.parentElement.classList.add('canvas-container');
    }
  }, []);

  return (
    <>
      <div className="max-padd-container bg-primary rounded-xl p-3 mt-5 mb-6">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Furniture 3D View </h1>
          <hr className="border-1 border-[2px] border-wid border-black my-3 w-24" />
        </div>

        <div>
          <p className="text-lg font-semibold mb-4 mt-4 text-center">
            Want to Customize Furniture, Customize it from below
          </p>
        </div>

        <DimensionControls
          dimensions={dimensions}
          onDimensionChange={handleDimensionChange}
        />
        <p className="text-lg font-semibold mt-4 text-black">Price: ${price.toFixed(2)}</p>
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 w-[170px] rounded-3xl hover:bg-red-600 transition-colors"
          >
            Reset Dimensions
          </button>
          <button
            onClick={handleSave}
            className="bg-gray-500 text-white px-4 py-2 rounded-3xl w-[170px] hover:bg-gray-600 transition-colors"
          >
            Save Price
          </button>
        </div>
        <div className="canvas-container">
          <Canvas
            style={{
              width: "100%",
              height: "500px",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "40px",
              backgroundColor: "#f8f8f8",
              alignItems: "center",
              justifyContent: "center",
            }}
            dpr={[1, 2]}
            camera={{ 
              position: [0, 0.5, 2],
              fov: 45,
              near: 0.1,
              far: 1000
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
        <ColorPicker onColorChange={handleColorChange} />
        <div className="flex justify-center">
          <ARButton
            sessionInit={{ 
              requiredFeatures: ["hit-test"],
              optionalFeatures: ["dom-overlay"],
              domOverlay: { root: document.body }
            }}
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