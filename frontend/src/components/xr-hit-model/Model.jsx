import React, { Suspense, useRef, useEffect, useState } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshStandardMaterial, Box3, Vector3 } from "three";

export default function Model({ 
  position = [0, 0, 0], 
  modelPath, 
  color, 
  dimensions = { width: 1, height: 1, depth: 1 },
  scale = [1, 1, 1],
  opacity = 1,
  isGhost = false
}) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, modelPath || "/models/default.glb");
  const [modelSize, setModelSize] = useState({ width: 1, height: 1, depth: 1 });
  const [isModelCentered, setIsModelCentered] = useState(false);

  // Center and scale the model appropriately
  useEffect(() => {
    if (gltf.scene && group.current) {
      // Clone the model to avoid modifying the original
      const modelScene = gltf.scene.clone();
      
      // Calculate the bounding box to center the model
      const box = new Box3().setFromObject(modelScene);
      const size = box.getSize(new Vector3());
      
      // Store the original size
      setModelSize({
        width: size.x,
        height: size.y,
        depth: size.z
      });
      
      // Center the model based on its bounding box
      const center = box.getCenter(new Vector3());
      modelScene.position.sub(center);
      
      // Apply materials and transparency
      modelScene.traverse((child) => {
        if (child.isMesh) {
          // Create a new material to avoid modifying the original
          const newMaterial = new MeshStandardMaterial({
            color: color || child.material.color,
            transparent: isGhost || opacity < 1,
            opacity: opacity,
            roughness: 0.7,
            metalness: 0.2,
          });
          
          // Apply the new material
          child.material = newMaterial;
        }
      });
      
      // Replace the current model with the centered one
      while (group.current.children.length > 0) {
        group.current.remove(group.current.children[0]);
      }
      group.current.add(modelScene);
      setIsModelCentered(true);
    }
  }, [gltf.scene, color, opacity, isGhost]);

  // Adjust the model position and scale based on props
  useEffect(() => {
    if (group.current && isModelCentered) {
      // Apply position
      group.current.position.set(position[0], position[1], position[2]);
      
      // Apply scale based on dimensions and scale props
      group.current.scale.set(
        dimensions.width * scale[0],
        dimensions.height * scale[1],
        dimensions.depth * scale[2]
      );
    }
  }, [position, dimensions, scale, isModelCentered]);

  return (
    <group ref={group} position={position}>
      <Suspense fallback={null}>
        {/* The model will be added to this group in the useEffect */}
      </Suspense>
    </group>
  );
}

useGLTF.preload("/models/default.glb");