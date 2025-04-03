import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { Interactive, useHitTest, useXR } from '@react-three/xr';
import Model from './Model';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, Matrix4, Quaternion } from 'three';

const XrHitModel = ({ modelPath, color, dimensions = { width: 1, height: 1, depth: 1 } }) => {
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

  // Track touch points for pinch-to-scale
  const touchPointsRef = useRef([]);
  
  // Adjust model scale for better fit
  const modelScale = [1, 1, 1];

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
          
          if (isScalingPlacement) {
            // Apply scaling to placement (ghost) model
            setPlacementDimensions({
              width: initialModelDimensions.width * scaleFactor,
              height: initialModelDimensions.height * scaleFactor,
              depth: initialModelDimensions.depth * scaleFactor
            });
          } else if (selectedModel) {
            // Apply scaling to selected model
            setModels(prevModels => prevModels.map(model => {
              if (model.id === selectedModel) {
                return {
                  ...model,
                  dimensions: {
                    width: initialModelDimensions.width * scaleFactor,
                    height: initialModelDimensions.height * scaleFactor,
                    depth: initialModelDimensions.depth * scaleFactor
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
      
      gl.domElement.addEventListener('touchstart', handleTouchStart);
      gl.domElement.addEventListener('touchmove', handleTouchMove);
      gl.domElement.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        gl.domElement.removeEventListener('touchstart', handleTouchStart);
        gl.domElement.removeEventListener('touchmove', handleTouchMove);
        gl.domElement.removeEventListener('touchend', handleTouchEnd);
      };
    } else {
      camera.fov = 45;
    }
    camera.updateProjectionMatrix(); 
  }, [isPresenting, camera, selectedModel, models, initialPinchDistance, initialModelDimensions, gl, isScalingPlacement, placementDimensions]);

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
      color: color,
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
          {/* Ghost model for placement */}
          <Interactive onSelect={placeModel}>
            <group ref={placementModelRef}>
              <Model
                modelPath={modelPath}
                color={color}
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

          {/* Already placed models */}
          {models.map(({ id, position, rotation, color: modelColor, dimensions: modelDimensions }) => (
            <Interactive key={id} onSelect={() => handleModelSelect(id)}>
              <group position={position} quaternion={rotation}>
                <Model
                  modelPath={modelPath}
                  color={modelColor || color}
                  dimensions={modelDimensions || dimensions}
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
                position={[0, 0.2, -0.5]}
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
                position={[0, 0.1, -0.5]}
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