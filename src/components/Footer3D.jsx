"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Center } from "@react-three/drei";
import { useRef } from "react";
import { Model } from "../model/mode"; // your astronaut model

function Scene() {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.003;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <Float floatIntensity={1} speed={2}>
        <Center>
          <group ref={ref} scale={0.8}>
            <Model />
          </group>
        </Center>
      </Float>
    </>
  );
}

export default function Footer3D() {
  return (
    <div className="h-64 w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Scene />
      </Canvas>
    </div>
  );
}