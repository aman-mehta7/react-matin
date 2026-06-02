"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Center, PerspectiveCamera,Float } from "@react-three/drei";
import { Model } from "../model/mode"; // Your Astronaut
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, ClipboardList, Zap } from "lucide-react"; // Icons
import Particles from "./Particle";

gsap.registerPlugin(ScrollTrigger);

function Scene({ mouse }) {
  const scrollGroup = useRef();
  const rotationGroup = useRef();

  // --- MOUSE LOGIC (Targets the ROTATION group) ---
useFrame(() => {
  if (!rotationGroup.current) return;

  const targetY = mouse.current.x * 0.7;
  const targetX = mouse.current.y * -0.2;

  rotationGroup.current.rotation.y +=
    (targetY - rotationGroup.current.rotation.y) * 0.08;

  rotationGroup.current.rotation.x +=
    (targetX - rotationGroup.current.rotation.x) * 0.08;
});

  return (
    <>
      <Particles count={200} />
    <group ref={scrollGroup}>
       <group ref={rotationGroup} scale={1.05}>
          <Float
            floatIntensity={2}
            rotationIntensity={2}
            floatingRange={[0, 0.2]}
          >
          {/* CENTER: Fixes the weird pivot point */}
          <Center>
            <Model />
          </Center>
          </Float>
        </group>
    </group>
    </>
  );
}

export default function WhyChooseUs() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // <main className="relative min-h-screen bg-[#E9F1F7] overflow-hidden flex items-center">
    <main className="relative min-h-screen  bg-brand overflow-hidden flex items-center">
        <div className="absolute z-20 -top-1 left-0 w-full h-20 pointer-events-none cloud" />
      {/* 3D CANVAS LAYER (Background/Right) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas shadow={false}>
          <ambientLight intensity={1.5} />
          <Environment preset="city" />
          <Scene mouse={mouse} />
          <PerspectiveCamera makeDefault position={[-1.2, .2, 5]} fov={40} />
        </Canvas>
      </div>

      {/* HTML CONTENT LAYER (Foreground/Left) */}
      <div className="container mx-auto px-8 md:px-24 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="max-w-xl">
          {/* Header Section */}
          <header className="mb-12">
            <h4 className="text-[#3B82F6] font-semibold tracking-wide mb-2">
              Why Choose Us
            </h4>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Quality Work Through Dedication
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Our clients value us for our deep industry expertise, experience and
              robust research capabilities, and for aggressively driving innovation
              with thought leadership and implementation.
            </p>
          </header>

          {/* Features Section */}
          <div className="space-y-8">
            <FeatureItem 
              Icon={Trophy}
              title="Our Mission"
              desc="To Have better educated and informed society about product, services and their social and legal right."
            />
            <FeatureItem 
              Icon={ClipboardList}
              title="Our Vision"
              desc="Our clients value us for our deep industry expertise, experience and robust research capabilities."
            />
            <FeatureItem 
              Icon={Zap}
              title="Strength"
              desc="Our strength is our talented team of expertise. Thanks to every staff who gave his best to excellence."
            />
          </div>
        </div>

        {/* Empty right col to let the 3D model breathe */}
        <div className="hidden lg:block"></div>
      </div>
    </main>
  );
}

// Sub-component for the Mission/Vision list items
function FeatureItem({ Icon, title, desc }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <Icon className="w-8 h-8 text-[#3B82F6]" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 leading-relaxed max-w-sm">{desc}</p>
      </div>
    </div>
  );
}