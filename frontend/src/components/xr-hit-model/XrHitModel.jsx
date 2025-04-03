import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { Interactive, useHitTest, useXR } from '@react-three/xr';
import Model from './Model';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, Matrix4, Quaternion, Euler } from 'three';

const XrHitModel = ({ modelPath, color, dimensions = { width: 1, height: 1, depth: 1 } }) => {
  const placementModelRef = useRef();
  const [models, setModels] = useState([]);
  const [placementPosition, setPlacementPosition] = useState(new Vector3(0, 0, 0));
  const [placementRotation, setPlacementRotation] = useState(new Euler(0, 0, 0));
  const [placementScale, setPlacementScale] = useState(1);
  const { isPresenting } = useXR();
  const { camera, raycaster, gl } = useThree();
  const [selectedModel, setSelectedModel] = useState(null);
  const [initialPinchDistance, setInitialPinchDistance] = useState(null);
  const [initialModelDimensions, setInitialModelDimensions] = useState(null);
  const [showDimensions, setShowDimensions] = useState({});
  
  // State for interaction mode
  const [interactionMode, setInteractionMode] = useState('place'); // 'place', 'rotate', 'scale'
  
  // Track touch points for pinch-to-scale and rotation
  const touchPointsRef = useRef([]);
  const lastTouchAngleRef = useRef(0);
  
  // Track rotations for both placement and placed models
  const rotationYRef = useRef(0);
  
  // Adjust model scale for better fit
  const modelScale = [1, 1, 1];

  useEffect(() => {
    if (isPresenting) {
      camera.fov = 60;
      
      // Add touch listeners for scaling and rotation
      const handleTouchStart = (event) => {
        if (event.touches.length === 2) {
          const touch1 = event.touches[0];
          const touch2 = event.touches[1];
          touchPointsRef.current = [
            { x: touch1.clientX, y: touch1.clientY },
            { x: touch2.clientX, y: touch2.clientY }
          ];
          
          // Calculate initial distance for scaling
          const distance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
          );
          setInitialPinchDistance(distance);
          
          // Calculate initial angle for rotation
          const angle = Math.atan2(
            touch2.clientY - touch1.clientY,
            touch2.clientX - touch1.clientX
          );
          lastTouchAngleRef.current = angle;
          
          // Set up the initial dimensions for scaling operations
          if (selectedModel) {
            setInitialModelDimensions({...models.find(m => m.id === selectedModel).dimensions});
          }
        }
      };
      
      const handleTouchMove = (event) => {
        if (event.touches.length === 2) {
          const touch1 = event.touches[0];
          const touch2 = event.touches[1];
          
          // Calculate new distance
          const newDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
          );
          
          // Calculate new angle
          const newAngle = Math.atan2(
            touch2.clientY - touch1.clientY,
            touch2.clientX - touch1.clientX
          );
          
          // Calculate angle change
          const angleDelta = newAngle - lastTouchAngleRef.current;
          lastTouchAngleRef.current = newAngle;
          
          if (selectedModel) {
            if (interactionMode === 'scale' && initialPinchDistance) {
              // Scale selected model
              const scaleFactor = newDistance / initialPinchDistance;
              
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
            } else if (interactionMode === 'rotate') {
              // Rotate selected model
              setModels(prevModels => prevModels.map(model => {
                if (model.id === selectedModel) {
                  // Create a new quaternion for the rotation update
                  const currentRotation = new Quaternion().copy(model.rotation);
                  const rotationUpdate = new Quaternion().setFromAxisAngle(
                    new Vector3(0, 1, 0), // Rotate around Y axis
                    angleDelta * 2 // Amplify rotation for better control
                  );
                  
                  // Combine the rotations
                  const newRotation = currentRotation.multiply(rotationUpdate);
                  
                  return {
                    ...model,
                    rotation: newRotation
                  };
                }
                return model;
              }));
            }
          } else {
            // Handle ghost model rotation when no model is selected
            if (interactionMode === 'rotate' && placementModelRef.current) {
              rotationYRef.current += angleDelta * 2;
              placementModelRef.current.rotation.y = rotationYRef.current;
              setPlacementRotation(new Euler(0, rotationYRef.current, 0));
            } else if (interactionMode === 'scale' && initialPinchDistance) {
              // Handle ghost model scaling
              const scaleFactor = newDistance / initialPinchDistance;
              const newScale = placementScale * scaleFactor;
              setPlacementScale(newScale);
            }
          }
        }
      };
      
      const handleTouchEnd = () => {
        touchPointsRef.current = [];
        setInitialPinchDistance(null);
        setInitialModelDimensions(null);
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
  }, [isPresenting, camera, selectedModel, models, initialPinchDistance, initialModelDimensions, gl, interactionMode, placementScale]);

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.set(0, 0.5, 2);
    }
  });

  // Use hit test to position the placement model
  useHitTest((hitMatrix, hit) => {
    if (placementModelRef.current) {
      // Store current rotation to maintain it during position updates
      const currentRotationY = placementModelRef.current.rotation.y;
      
      // Update position from hit test
      hitMatrix.decompose(
        placementModelRef.current.position,
        placementModelRef.current.quaternion,
        placementModelRef.current.scale
      );
      
      // Restore rotation
      placementModelRef.current.rotation.y = currentRotationY;
      
      // Update placement position state
      setPlacementPosition(placementModelRef.current.position.clone());
    }
  });

  // Place the model when the user touches the ghost model
  const placeModel = () => {
    if (interactionMode !== 'place') return;
    
    // Create quaternion from euler angles
    const rotation = new Quaternion().setFromEuler(placementRotation);
    
    const newModel = {
      id: Date.now(),
      position: placementPosition.clone(),
      rotation: rotation,
      color: color,
      dimensions: {
        width: dimensions.width * placementScale,
        height: dimensions.height * placementScale,
        depth: dimensions.depth * placementScale
      }
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
    
    // Reset placement scale and rotation for next placement
    setPlacementScale(1);
    rotationYRef.current = 0;
    placementModelRef.current.rotation.y = 0;
    setPlacementRotation(new Euler(0, 0, 0));
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
    if (interactionMode !== 'place') return;
    
    setSelectedModel(id === selectedModel ? null : id);
    // Show dimensions when selected
    setShowDimensions(prev => ({...prev, [id]: true}));
  };
  
  // Change interaction mode
  const toggleInteractionMode = () => {
    const modes = ['place', 'rotate', 'scale'];
    const currentIndex = modes.indexOf(interactionMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setInteractionMode(modes[nextIndex]);
    
    // Show mode change indicator
    showModeIndicator(modes[nextIndex]);
  };
  
  // Show indicator for mode changes
  const showModeIndicator = (mode) => {
    // Create a visual feedback element
    const indicator = document.createElement('div');
    indicator.style.position = 'fixed';
    indicator.style.top = '50%';
    indicator.style.left = '50%';
    indicator.style.transform = 'translate(-50%, -50%)';
    indicator.style.padding = '10px 20px';
    indicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    indicator.style.color = 'white';
    indicator.style.borderRadius = '20px';
    indicator.style.fontWeight = 'bold';
    indicator.style.zIndex = '10000';
    
    // Set text based on mode
    switch(mode) {
      case 'place':
        indicator.textContent = 'Mode: Place';
        indicator.style.backgroundColor = 'rgba(0, 128, 255, 0.7)';
        break;
      case 'rotate':
        indicator.textContent = 'Mode: Rotate';
        indicator.style.backgroundColor = 'rgba(255, 128, 0, 0.7)';
        break;
      case 'scale':
        indicator.textContent = 'Mode: Scale';
        indicator.style.backgroundColor = 'rgba(0, 200, 0, 0.7)';
        break;
    }
    
    document.body.appendChild(indicator);
    
    // Remove after animation
    setTimeout(() => {
      indicator.style.opacity = '0';
      indicator.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        indicator.remove();
      }, 500);
    }, 1500);
  };
  
  // Format dimensions for display
  const formatDimensions = (dim) => {
    return `${dim.width.toFixed(2)}m × ${dim.height.toFixed(2)}m × ${dim.depth.toFixed(2)}m`;
  };
  
  // Add event listener for double tap to change modes
  useEffect(() => {
    if (isPresenting) {
      let lastTap = 0;
      
      const handleDoubleTap = (event) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
          toggleInteractionMode();
          event.preventDefault();
        }
        
        lastTap = currentTime;
      };
      
      document.addEventListener('touchend', handleDoubleTap);
      
      return () => {
        document.removeEventListener('touchend', handleDoubleTap);
      };
    }
  }, [isPresenting, interactionMode]);

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
                dimensions={{
                  width: dimensions.width * placementScale,
                  height: dimensions.height * placementScale,
                  depth: dimensions.depth * placementScale
                }}
                scale={modelScale}
                opacity={0.6}
                isGhost={true}
              />
              {/* Show dimensions for ghost model */}
              <Text
                position={[0, dimensions.height * placementScale * 0.5 + 0.1, 0]}
                fontSize={0.05}
                color="black"
                anchorX="center"
                anchorY="bottom"
                backgroundOpacity={0.7}
                backgroundColor="white"
                padding={0.02}
              >
                {formatDimensions({
                  width: dimensions.width * placementScale,
                  height: dimensions.height * placementScale,
                  depth: dimensions.depth * placementScale
                })}
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
          
          {/* Mode indicator */}
          <group position={[0, 0.3, -0.5]}>
            <Text
              position={[0, 0, 0]}
              fontSize={0.05}
              color="black"
              anchorX="center"
              anchorY="center"
              backgroundOpacity={0.7}
              backgroundColor={
                interactionMode === 'place' ? "#0080ff" : 
                interactionMode === 'rotate' ? "#ff8000" : 
                "#00c800"
              }
              padding={0.02}
            >
              Mode: {interactionMode.charAt(0).toUpperCase() + interactionMode.slice(1)}
            </Text>
          </group>
          
          {/* Instructions */}
          {models.length === 0 && (
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
          )}
          
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
            Double tap to change mode
          </Text>
          
          {interactionMode === 'scale' && (
            <Text
              position={[0, 0, -0.5]}
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
          
          {interactionMode === 'rotate' && (
            <Text
              position={[0, 0, -0.5]}
              fontSize={0.05}
              color="black"
              anchorX="center"
              anchorY="center"
              backgroundOpacity={0.7}
              backgroundColor="white"
              padding={0.02}
            >
              Rotate with two fingers
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default XrHitModel;