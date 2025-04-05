import { Canvas } from "@react-three/fiber";
import { ARButton, XR, Controllers } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import ColorPicker from "../ColorPicker";
import { useState, useEffect, useRef } from "react";
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
  const canvasContainerRef = useRef(null);
  
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

  // Cache original styles to restore them later
  const originalStyles = useRef(new Map());

  // Handle AR session start
  const handleARSessionStart = () => {
    setIsInARMode(true);
    
    // Create dedicated AR overlay container that will ONLY contain AR elements
    const arOverlayContainer = document.createElement('div');
    arOverlayContainer.id = 'ar-overlay-container';
    arOverlayContainer.style.position = 'fixed';
    arOverlayContainer.style.top = '0';
    arOverlayContainer.style.left = '0';
    arOverlayContainer.style.width = '100vw';
    arOverlayContainer.style.height = '100vh';
    arOverlayContainer.style.zIndex = '9999';
    arOverlayContainer.style.backgroundColor = 'transparent';
    document.body.appendChild(arOverlayContainer);
    
    // Create a minimal AR mode indicator within the overlay
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
    arIndicator.style.zIndex = '10000';
    arIndicator.textContent = 'AR Mode Active';
    arOverlayContainer.appendChild(arIndicator);
    
    // Apply CSS to hide ALL non-AR elements (very aggressive approach)
    const styleTag = document.createElement('style');
    styleTag.id = 'ar-mode-styles';
    styleTag.textContent = `
      body > *:not(#ar-overlay-container):not(canvas):not(.canvas-container):not([id^="xr-"]) {
        display: none !important;
      }
      #root > * {
        display: none !important;
      }
      .canvas-container {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 999 !important;
      }
      canvas {
        width: 100% !important;
        height: 100% !important;
        border-radius: 0 !important;
        margin: 0 !important;
      }
    `;
    document.head.appendChild(styleTag);
    
    // Make sure the canvas is the only visible element
    if (canvasContainerRef.current) {
      canvasContainerRef.current.style.position = 'fixed';
      canvasContainerRef.current.style.top = '0';
      canvasContainerRef.current.style.left = '0';
      canvasContainerRef.current.style.width = '100vw';
      canvasContainerRef.current.style.height = '100vh';
      canvasContainerRef.current.style.zIndex = '999';
    }
    
    // Force body to full height/width
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Explicitly hide any possible UI containers
    const containers = [
      document.querySelector('.max-padd-container'),
      document.querySelector('header'),
      document.querySelector('footer'),
      document.querySelector('nav'),
      document.getElementById('root')
    ];
    
    containers.forEach(container => {
      if (container) {
        // Save original display style
        originalStyles.current.set(container, container.style.display);
        // Hide it
        container.style.display = 'none';
      }
    });
  };
  
  // Handle AR session end
  const handleARSessionEnd = () => {
    setIsInARMode(false);
    
    // Remove the AR overlay container
    const arOverlayContainer = document.getElementById('ar-overlay-container');
    if (arOverlayContainer) {
      arOverlayContainer.remove();
    }
    
    // Remove the style tag
    const styleTag = document.getElementById('ar-mode-styles');
    if (styleTag) {
      styleTag.remove();
    }
    
    // Reset canvas container styles
    if (canvasContainerRef.current) {
      canvasContainerRef.current.style.position = '';
      canvasContainerRef.current.style.top = '';
      canvasContainerRef.current.style.left = '';
      canvasContainerRef.current.style.width = '';
      canvasContainerRef.current.style.height = '';
      canvasContainerRef.current.style.zIndex = '';
    }
    
    // Reset body styles
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.body.style.margin = '';
    document.body.style.padding = '';
    
    // Restore original display styles
    originalStyles.current.forEach((value, element) => {
      element.style.display = value;
    });
    
    // Clear the map
    originalStyles.current.clear();
    
    // Force re-display of main container
    const mainContainer = document.querySelector('.max-padd-container');
    if (mainContainer) {
      mainContainer.style.display = 'block';
    }
  };

  // Custom ARButton that modifies the session init
  const CustomARButton = () => {
    // Prepare a clean DOM overlay for AR mode
    const setupDomOverlay = () => {
      // Create a clean overlay div if it doesn't exist
      let arOverlayRoot = document.getElementById('ar-overlay-root');
      if (!arOverlayRoot) {
        arOverlayRoot = document.createElement('div');
        arOverlayRoot.id = 'ar-overlay-root';
        arOverlayRoot.style.position = 'fixed';
        arOverlayRoot.style.top = '0';
        arOverlayRoot.style.left = '0';
        arOverlayRoot.style.width = '100%';
        arOverlayRoot.style.height = '100%';
        arOverlayRoot.style.zIndex = '9000';
        arOverlayRoot.style.pointerEvents = 'none';
        document.body.appendChild(arOverlayRoot);
      }
      
      // Clear any existing content
      arOverlayRoot.innerHTML = '';
      
      return arOverlayRoot;
    };
    
    const sessionInit = {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: { root: setupDomOverlay() }
    };
    
    return (
      <ARButton
        sessionInit={sessionInit}
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
    );
  };

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
        <div ref={canvasContainerRef} className="canvas-container">
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
          <CustomARButton />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default XrHitModelContainer;