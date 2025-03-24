import React, { Suspense, useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Model({ position, modelPath, color, dimensions = { width: 1, height: 1, depth: 1 } }) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, modelPath || "/models/default.glb");

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color); 
        }
      });
    }
  }, [gltf.scene, color]);

  return (
    <Suspense fallback={null}>
      <primitive
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
          cursor: "pointer",
          margintop: "40px",
        }}
        object={gltf.scene}
        scale={[dimensions.width, dimensions.height, dimensions.depth]}
        position={[0, -0.4, 0]}
      />
    </Suspense>
  );
}

useGLTF.preload("/models/default.glb");