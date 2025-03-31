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

  useEffect(() => {
    if (isPresenting) {
      camera.fov = 50; 
    } else {
      camera.fov = 30; 
    }
    camera.updateProjectionMatrix(); 
  }, [isPresenting, camera]);

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
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
      
      // Adjust position if needed
      placementModelRef.current.position.y -= 0.1;
      
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
      <OrbitControls />
      <PerspectiveCamera position={[0, 1, 4]} zoom={0.8} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      {/* Display preview model in non-AR mode */}
      {!isPresenting && (
        <Model 
          modelPath={modelPath} 
          color={color} 
          dimensions={dimensions} 
          scale={[5, 5, 5]}
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
                scale={[5, 5, 5]}
                opacity={0.5}
                isGhost={true}
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
              scale={[5, 5, 5]}
            />
          ))}
        </>
      )}
    </>
  );
};

export default XrHitModel;