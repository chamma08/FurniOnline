import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Interactive, useHitTest, useXR } from '@react-three/xr';
import Model from './Model';
import { useThree } from '@react-three/fiber';

const XrHitModel = ({ modelPath, color, dimensions = { width: 1, height: 1, depth: 1 } }) => {
  const reticleRef = useRef();
  const [models, setModels] = useState([]);

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

  useHitTest((hitMatrix, hit) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
  
    // Adjust the reticle's position to be exactly on the floor
    reticleRef.current.position.y -= 0.1; // Adjust this value based on your needs
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setModels([{ id, position }]);
  };

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting &&
        models.map(({ position, id }) => {
          return (
            <Model
              key={id}
              position={position}
              modelPath={modelPath}
              color={color}
              dimensions={dimensions}
              scale={[5,5,5]}
            />
          );
        })}
      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}

      {!isPresenting && <Model modelPath={modelPath} color={color} dimensions={dimensions} scale={[5, 5, 5]}/>}
    </>
  );
};

export default XrHitModel;