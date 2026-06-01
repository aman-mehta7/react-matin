"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  Center,
  Float,
} from "@react-three/drei";
import { Model } from "../model/mode";
import Bulb from "../model/Bulb";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SceneContent() {
  const positionGroup = useRef();
  const rotationGroup = useRef();
  const bulbGroup = useRef();
  const lightRef = useRef();

  // ✅ Scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top 0%",
          end: "top -100%",
          scrub: 1,
        },
      })
        .to(positionGroup.current.position, {
          x: 0,
          y: -0.5,
          ease: "power2.inOut",
        })
        .to(
          positionGroup.current.scale,
          { x: 1.2, y: 1.2, z: 1.2, ease: "power2.inOut" },
          0
        )
        .to(
          positionGroup.current.rotation,
          { x: 0, y: -1.2, ease: "power2.inOut" },
          0
        );
    });

    return () => ctx.revert();
  }, []);

  // ✅ Mouse + Light animation
  useFrame((state) => {
    const { mouse, clock } = state;

    if (rotationGroup.current) {
      const targetY = mouse.x * 0.7;
      const targetX = mouse.y * -0.2;

      rotationGroup.current.rotation.y +=
        (targetY - rotationGroup.current.rotation.y) * 0.08;

      rotationGroup.current.rotation.x +=
        (targetX - rotationGroup.current.rotation.x) * 0.08;
    }

    if (bulbGroup.current) {
      bulbGroup.current.rotation.y +=
        (mouse.x * 0.5 - bulbGroup.current.rotation.y) * 0.05;
    }

    if (lightRef.current) {
      lightRef.current.intensity =
        6 + Math.sin(clock.elapsedTime * 2) * 1.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Environment preset="sunset" />

      {/* MODEL */}
      <group ref={positionGroup}>
        <group ref={rotationGroup} scale={1.2}>
          <Float floatIntensity={1} rotationIntensity={1} floatingRange={[0, 0.3]}>
            <Center>
              <Model />
            </Center>
          </Float>
        </group>
      </group>

      {/* BULB */}
      <group ref={bulbGroup} position={[-1, 3.5, -2]} scale={1.2}>
        <group position={[0, -3.5, 0]}>
          
          <pointLight
            ref={lightRef}
            intensity={10}
            distance={10}
            color="#ffd966"
            decay={2}
          />

          <Bulb />
        </group>
      </group>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      className="w-full h-screen"
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
    >
      <PerspectiveCamera makeDefault position={[-2, 0, 5]} fov={50} />
      <SceneContent />
    </Canvas>
  );
}