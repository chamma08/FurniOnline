import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

const ArView = () => {
  const Model = () => {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} scale={1} />;
  };
  return (
    <Canvas style={{ height: 300 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Environment preset="studio" />
        <OrbitControls />
        <Model />
      </Suspense>
    </Canvas>
  );
};

export default ArView;
