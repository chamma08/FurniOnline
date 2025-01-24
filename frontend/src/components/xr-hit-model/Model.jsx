import React, { Suspense, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Model({position}) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, "/models/chair1.glb");
  /* const { actions } = useAnimations(animations, group); */
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} scale={2} position={position} />
    </Suspense>
  );
}

useGLTF.preload("/models/chair1.glb");

/*import { useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Model = ({position}) => {
  const gltf = useLoader(GLTFLoader, "/models/model2.gltf");
  return (
    <Suspense fallback={null}>
      <primitive position={position} object={gltf.scene} />
    </Suspense>
  )
}

export default Model*/
