"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Model } from "../model/mode";
// import { Bulb } from "../model/bulb";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FollowCursorModel({ mouse }) {
  const group = useRef(null);
  const bulb = useRef(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!bulb.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bulb.current.position, {
        y: -5,
        z: 5,
        x: 0,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          markers: false,
        },
      });

      gsap.to(bulb.current.scale, {
        x: 8,
        y: 8,
        z: 8,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.to(bulb.current.rotation, {
        z: Math.PI * 2,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useFrame(() => {
    if (!group.current) return;

    targetRotation.current.y = mouse.current.x * 0.7;
    targetRotation.current.x = mouse.current.y * -0.2;

    gsap.to(group.current.rotation, {
      y: targetRotation.current.y,
      x: targetRotation.current.x,
      duration: 4,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (bulb.current) {
      gsap.to(bulb.current.rotation, {
        y: targetRotation.current.y,
        x: targetRotation.current.x,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      });
    }
  });

  return (
    <>
      <group ref={group} position={[0, 0, 0]} scale={1.05}>
        <Model />
      </group>

      {/* Uncomment if you want the bulb back */}
      {/* 
      <group ref={bulb} position={[3, 2, -2]} scale={4}>
        <Bulb />
      </group>
      */}
    </>
  );
}

export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas className="w-full h-screen">
      <ambientLight intensity={1.1} />  
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Environment preset="sunset" />

      <FollowCursorModel mouse={mouse} />

      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}