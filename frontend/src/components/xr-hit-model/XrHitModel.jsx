import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { Interactive, useHitTest, useXR } from '@react-three/xr';
import Model from './Model';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, Matrix4, Quaternion } from 'three';

const XrHitModel = ({ modelPath, color, dimensions = { width: 1, height: 1, depth: 1 }, availableColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"] }) => {
  const placementModelRef = useRef();
  const [models, setModels] = useState([]);
  const [placementPosition, setPlacementPosition] = useState(new Vector3(0, 0, 0));
  const { isPresenting } = useXR();
  const { camera, raycaster, gl } = useThree();
  const [selectedModel, setSelectedModel] = useState(null);
  const [initialPinchDistance, setInitialPinchDistance] = useState(null);
  const [initialModelDimensions, setInitialModelDimensions] = useState(null);
  const [showDimensions, setShowDimensions] = useState({});
  
  // Current dimensions for placement model (ghost model)
  const [placementDimensions, setPlacementDimensions] = useState({...dimensions});
  
  // Flag to track if we're currently scaling the placement model
  const [isScalingPlacement, setIsScalingPlacement] = useState(false);
  
  // New state for ghost model visibility
  const [showGhostModel, setShowGhostModel] = useState(true);
  
  // New state for current color in AR mode
  const [currentArColor, setCurrentArColor] = useState(color);

  // Track touch points for pinch-to-scale
  const touchPointsRef = useRef([]);
  
  // Adjust model scale for better fit
  const modelScale = [1, 1, 1];

  // New function to toggle ghost model visibility
  const toggleGhostModel = () => {
    setShowGhostModel(!showGhostModel);
  };
  
  // New function to change the color in AR mode
  const changeArColor = (nextColor) => {
    setCurrentArColor(nextColor);
  };

  useEffect(() => {
    if (isPresenting) {
      camera.fov = 60;
      
      // Add touch listeners for pinch-to-scale
      const handleTouchStart = (event) => {
        if (event.touches.length === 2) {
          const touch1 = event.touches[0];
          const touch2 = event.touches[1];
          touchPointsRef.current = [
            { x: touch1.clientX, y: touch1.clientY },
            { x: touch2.clientX, y: touch2.clientY }
          ];
          
          // Calculate initial distance
          const distance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
          );
          setInitialPinchDistance(distance);
          
          if (selectedModel) {
            // Scaling a selected model
            setInitialModelDimensions({...models.find(m => m.id === selectedModel).dimensions});
            setIsScalingPlacement(false);
          } else {
            // Scaling the placement model
            setInitialModelDimensions({...placementDimensions});
            setIsScalingPlacement(true);
          }
        }
      };
      
      const handleTouchMove = (event) => {
        if (event.touches.length === 2 && initialPinchDistance && initialModelDimensions) {
          const touch1 = event.touches[0];
          const touch2 = event.touches[1];
          
          // Calculate new distance
          const newDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
          );
          
          // Calculate scale factor
          const scaleFactor = newDistance / initialPinchDistance;
          
          // Apply a more responsive scaling factor
          const adjustedScaleFactor = 1 + (scaleFactor - 1) * 1.5;
          
          if (isScalingPlacement) {
            // Apply scaling to placement (ghost) model
            setPlacementDimensions({
              width: initialModelDimensions.width * adjustedScaleFactor,
              height: initialModelDimensions.height * adjustedScaleFactor,
              depth: initialModelDimensions.depth * adjustedScaleFactor
            });
          } else if (selectedModel) {
            // Apply scaling to selected model
            setModels(prevModels => prevModels.map(model => {
              if (model.id === selectedModel) {
                return {
                  ...model,
                  dimensions: {
                    width: initialModelDimensions.width * adjustedScaleFactor,
                    height: initialModelDimensions.height * adjustedScaleFactor,
                    depth: initialModelDimensions.depth * adjustedScaleFactor
                  }
                };
              }
              return model;
            }));
          }
        }
      };
      
      const handleTouchEnd = () => {
        touchPointsRef.current = [];
        setInitialPinchDistance(null);
        setInitialModelDimensions(null);
        setIsScalingPlacement(false);
      };
      
      gl.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      gl.domElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      gl.domElement.addEventListener('touchend', handleTouchEnd);
      
      // Create AR UI controls for ghost toggle and color change
      createArControls();
      
      return () => {
        gl.domElement.removeEventListener('touchstart', handleTouchStart);
        gl.domElement.removeEventListener('touchmove', handleTouchMove);
        gl.domElement.removeEventListener('touchend', handleTouchEnd);
        
        // Remove AR UI controls
        removeArControls();
      };
    } else {
      camera.fov = 45;
    }
    camera.updateProjectionMatrix(); 
  }, [isPresenting, camera, selectedModel, models, initialPinchDistance, initialModelDimensions, gl, isScalingPlacement, placementDimensions, showGhostModel]);

  // Create AR UI controls
  const createArControls = () => {
    // Create container for AR controls
    const arControlsContainer = document.createElement('div');
    arControlsContainer.id = 'ar-controls-container';
    arControlsContainer.style.position = 'fixed';
    arControlsContainer.style.bottom = '20px';
    arControlsContainer.style.left = '50%';
    arControlsContainer.style.transform = 'translateX(-50%)';
    arControlsContainer.style.display = 'flex';
    arControlsContainer.style.flexDirection = 'column';
    arControlsContainer.style.gap = '10px';
    arControlsContainer.style.zIndex = '10000';
    
    // Create ghost toggle button
    const ghostToggleButton = document.createElement('button');
    ghostToggleButton.id = 'ghost-toggle-button';
    ghostToggleButton.textContent = 'Hide Ghost Model';
    ghostToggleButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    ghostToggleButton.style.color = 'white';
    ghostToggleButton.style.padding = '10px 20px';
    ghostToggleButton.style.borderRadius = '20px';
    ghostToggleButton.style.border = 'none';
    ghostToggleButton.style.fontWeight = 'bold';
    ghostToggleButton.style.cursor = 'pointer';
    ghostToggleButton.addEventListener('click', toggleGhostModel);
    
    // Create color picker container
    const colorPickerContainer = document.createElement('div');
    colorPickerContainer.id = 'ar-color-picker';
    colorPickerContainer.style.display = 'flex';
    colorPickerContainer.style.justifyContent = 'center';
    colorPickerContainer.style.gap = '10px';
    colorPickerContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    colorPickerContainer.style.padding = '10px';
    colorPickerContainer.style.borderRadius = '20px';
    
    // Add color options
    availableColors.forEach(colorOption => {
      const colorButton = document.createElement('div');
      colorButton.style.width = '30px';
      colorButton.style.height = '30px';
      colorButton.style.backgroundColor = colorOption;
      colorButton.style.borderRadius = '50%';
      colorButton.style.cursor = 'pointer';
      colorButton.style.border = '2px solid white';
      colorButton.addEventListener('click', () => changeArColor(colorOption));
      colorPickerContainer.appendChild(colorButton);
    });
    
    // Add elements to container
    arControlsContainer.appendChild(ghostToggleButton);
    arControlsContainer.appendChild(colorPickerContainer);
    
    // Add container to body
    document.body.appendChild(arControlsContainer);
  };
  
  // Remove AR UI controls
  const removeArControls = () => {
    const arControlsContainer = document.getElementById('ar-controls-container');
    if (arControlsContainer) {
      arControlsContainer.remove();
    }
  };

  // Update ghost toggle button text
  useEffect(() => {
    const ghostToggleButton = document.getElementById('ghost-toggle-button');
    if (ghostToggleButton) {
      ghostToggleButton.textContent = showGhostModel ? 'Hide Ghost Model' : 'Show Ghost Model';
    }
  }, [showGhostModel]);

  // Sync placement dimensions with prop dimensions on initial load and changes
  useEffect(() => {
    setPlacementDimensions({...dimensions});
  }, [dimensions]);

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.set(0, 0.5, 2);
    }
  });

  // Use hit test to position the placement model
  useHitTest((hitMatrix, hit) => {
    if (placementModelRef.current) {
      hitMatrix.decompose(
        placementModelRef.current.position,
        placementModelRef.current.quaternion,
        placementModelRef.current.scale
      );
      
      // Update placement position state
      setPlacementPosition(placementModelRef.current.position.clone());
    }
  });

  // Place the model when the user touches the ghost model
  const placeModel = () => {
    const newModel = {
      id: Date.now(),
      position: placementPosition.clone(),
      rotation: placementModelRef.current.quaternion.clone(),
      color: currentArColor, // Use current AR color
      dimensions: {...placementDimensions} // Use the currently scaled dimensions
    };
    
    // Add the new model to the array of placed models
    setModels([...models, newModel]);
    
    // Show dimensions temporarily
    setShowDimensions(prev => ({...prev, [newModel.id]: true}));
    setTimeout(() => {
      setShowDimensions(prev => ({...prev, [newModel.id]: false}));
    }, 3000);
    
    // Briefly show a placement indicator
    showPlacementIndicator(placementPosition);
  };
  
  // Show a brief visual indicator when placement occurs
  const showPlacementIndicator = (position) => {
    // Create a visual feedback element
    const indicator = document.createElement('div');
    indicator.style.position = 'fixed';
    indicator.style.top = '50%';
    indicator.style.left = '50%';
    indicator.style.transform = 'translate(-50%, -50%)';
    indicator.style.padding = '10px 20px';
    indicator.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
    indicator.style.color = 'white';
    indicator.style.borderRadius = '20px';
    indicator.style.fontWeight = 'bold';
    indicator.style.zIndex = '10000';
    indicator.textContent = 'Model Placed';
    
    document.body.appendChild(indicator);
    
    // Remove after animation
    setTimeout(() => {
      indicator.style.opacity = '0';
      indicator.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        indicator.remove();
      }, 500);
    }, 1000);
  };
  
  // Handle model selection
  const handleModelSelect = (id) => {
    setSelectedModel(id === selectedModel ? null : id);
    // Show dimensions when selected
    setShowDimensions(prev => ({...prev, [id]: true}));
  };
  
  // Format dimensions for display
  const formatDimensions = (dim) => {
    return `${dim.width.toFixed(2)}m × ${dim.height.toFixed(2)}m × ${dim.depth.toFixed(2)}m`;
  };

  return (
    <>
      {!isPresenting && (
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          target={[0, 0, 0]}
        />
      )}
      
      <PerspectiveCamera position={[0, 0.5, 2]} zoom={1} />
      
      {/* Better lighting for model visibility */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      
      {/* Display preview model in non-AR mode */}
      {!isPresenting && (
        <Model 
          modelPath={modelPath} 
          color={color} 
          dimensions={dimensions} 
          scale={modelScale}
          position={[0, 0, 0]}
        />
      )}

      {/* In AR mode, display placed models and ghost model */}
      {isPresenting && (
        <>
          {/* Ghost model for placement - only shown when showGhostModel is true */}
          {showGhostModel && (
            <Interactive onSelect={placeModel}>
              <group ref={placementModelRef}>
                <Model
                  modelPath={modelPath}
                  color={currentArColor}
                  dimensions={placementDimensions}
                  scale={modelScale}
                  opacity={0.6}
                  isGhost={true}
                />
                {/* Show dimensions for ghost model */}
                <Text
                  position={[0, placementDimensions.height * 0.5 + 0.1, 0]}
                  fontSize={0.05}
                  color="black"
                  anchorX="center"
                  anchorY="bottom"
                  backgroundOpacity={0.7}
                  backgroundColor="white"
                  padding={0.02}
                >
                  {formatDimensions(placementDimensions)}
                </Text>
              </group>
            </Interactive>
          )}

          {/* Already placed models */}
          {models.map(({ id, position, rotation, color: modelColor, dimensions: modelDimensions }) => (
            <Interactive key={id} onSelect={() => handleModelSelect(id)}>
              <group position={position} quaternion={rotation}>
                <Model
                  modelPath={modelPath}
                  color={modelColor}
                  dimensions={modelDimensions}
                  scale={modelScale}
                  opacity={selectedModel === id ? 0.8 : 1}
                />
                
                {/* Selection indicator */}
                {selectedModel === id && (
                  <mesh position={[0, 0, 0]} scale={[
                    modelDimensions.width + 0.05, 
                    modelDimensions.height + 0.05, 
                    modelDimensions.depth + 0.05
                  ]}>
                    <boxGeometry />
                    <meshBasicMaterial color="#00ff00" wireframe={true} />
                  </mesh>
                )}
                
                {/* Dimensions text */}
                {(showDimensions[id] || selectedModel === id) && (
                  <Text
                    position={[0, modelDimensions.height * 0.5 + 0.1, 0]}
                    fontSize={0.05}
                    color="black"
                    anchorX="center"
                    anchorY="bottom"
                    backgroundOpacity={0.7}
                    backgroundColor="white"
                    padding={0.02}
                  >
                    {formatDimensions(modelDimensions)}
                  </Text>
                )}
              </group>
            </Interactive>
          ))}
          
          {/* Instructions */}
          {models.length === 0 && (
            <>
              <Text
                position={[0, 0.3, -0.5]}
                fontSize={0.05}
                color="black"
                anchorX="center"
                anchorY="center"
                backgroundOpacity={0.7}
                backgroundColor="white"
                padding={0.02}
              >
                Tap to place furniture
              </Text>
              <Text
                position={[0, 0.2, -0.5]}
                fontSize={0.05}
                color="black"
                anchorX="center"
                anchorY="center"
                backgroundOpacity={0.7}
                backgroundColor="white"
                padding={0.02}
              >
                Pinch to resize before placing
              </Text>
              <Text
                position={[0, 0.1, -0.5]}
                fontSize={0.05}
                color="black"
                anchorX="center"
                anchorY="center"
                backgroundOpacity={0.7}
                backgroundColor="white"
                padding={0.02}
              >
                Use buttons below to change color and hide ghost
              </Text>
            </>
          )}
          
          {selectedModel && (
            <Text
              position={[0, 0.1, -0.5]}
              fontSize={0.05}
              color="black"
              anchorX="center"
              anchorY="center"
              backgroundOpacity={0.7}
              backgroundColor="white"
              padding={0.02}
            >
              Pinch to resize
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default XrHitModel;