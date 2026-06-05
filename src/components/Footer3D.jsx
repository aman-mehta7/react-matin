import { Canvas } from "@react-three/fiber";
import { Environment, Center, Float } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Model } from "../model/mode";
import gsap from "gsap";

function Scene() {
  const ref = useRef();



  // ✅ Smooth left-right animation
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(ref.current.position, {
      x: -8,
    }, {
      x: 4,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <Environment preset="city" />

      <Float speed={1} rotationIntensity={4} floatIntensity={4}>

      <Center>
        <group ref={ref} scale={1.2} >
          {/* <Model /> */}
        </group>
      </Center>
      </Float>
    </>
  );
}

export default function Footer3D() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}