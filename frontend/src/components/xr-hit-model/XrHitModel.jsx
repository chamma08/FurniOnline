import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Interactive, useHitTest, useXR } from '@react-three/xr';
import Model from './Model';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

const XrHitModel = ({ modelPath, color, dimensions = { width: 1, height: 1, depth: 1 } }) => {
  const placementModelRef = useRef();
  const [models, setModels] = useState([]);
  const [placementPosition, setPlacementPosition] = useState(new Vector3(0, 0, 0));
  const { isPresenting } = useXR();
  const { camera } = useThree();

  // Adjust model scale for better fit
  const modelScale = [1, 1, 1]; // Reduced from 5 to 1 for better fit

  useEffect(() => {
    if (isPresenting) {
      camera.fov = 60; // Increased FOV for better visibility in AR
    } else {
      camera.fov = 45; // Moderate FOV for non-AR view
    }
    camera.updateProjectionMatrix(); 
  }, [isPresenting, camera]);

  useThree(({ camera }) => {
    if (!isPresenting) {
      // Position camera for better view in non-AR mode
      camera.position.set(0, 0.5, 2); // Closer to the model and slightly elevated
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
      color: color,
      dimensions: {...dimensions}
    };
    
    // Add the new model to the array of placed models
    setModels([...models, newModel]);
  };

  return (
    <>
      <OrbitControls 
        enableZoom={!isPresenting}
        enablePan={!isPresenting}
        enableRotate={!isPresenting}
        target={[0, 0, 0]} // Center the controls
      />
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
          position={[0, 0, 0]} // Centered position
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
                dimensions={dimensions}
                scale={modelScale}
                opacity={0.5}
                isGhost={true}
                position={[0, 0, 0]} // Position will be set by hit test
              />
            </group>
          </Interactive>

          {/* Already placed models */}
          {models.map(({ id, position, color: modelColor, dimensions: modelDimensions }) => (
            <Model
              key={id}
              position={position}
              modelPath={modelPath}
              color={modelColor || color}
              dimensions={modelDimensions || dimensions}
              scale={modelScale}
            />
          ))}
        </>
      )}
    </>
  );
};

export default XrHitModel;