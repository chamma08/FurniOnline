import React, { Suspense, useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshStandardMaterial } from "three";

export default function Model({ 
  position, 
  modelPath, 
  color, 
  dimensions = { width: 1, height: 1, depth: 1 },
  scale = [5, 5, 5],
  opacity = 1,
  isGhost = false
}) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, modelPath || "/models/default.glb");

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Create a new material to avoid modifying the original
          const newMaterial = new MeshStandardMaterial({
            color: color || child.material.color,
            transparent: isGhost,
            opacity: opacity,
          });
          
          // Apply the new material
          child.material = newMaterial;
        }
      });
    }
  }, [gltf.scene, color, opacity, isGhost]);

  return (
    <Suspense fallback={null}>
      <primitive
        ref={group}
        object={gltf.scene.clone()}
        scale={[
          dimensions.width * scale[0], 
          dimensions.height * scale[1], 
          dimensions.depth * scale[2]
        ]}
        position={position || [0, -0.4, 0]}
      />
    </Suspense>
  );
}

useGLTF.preload("/models/default.glb");