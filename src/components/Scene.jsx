import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  Center,
  Float,
  useProgress,
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SoftechLoader from "./Loader";

// Lazy load 3D models
const Model = lazy(() => import("../model/model").then((m) => ({ default: m.Model })));
const Bulb = lazy(() => import("../model/Bulb"));
const Cup = lazy(() => import("../model/cup"));
const Donut = lazy(() => import("../model/donut"));

gsap.registerPlugin(ScrollTrigger);

function LoaderBridge({ setProgress, setActive }) {
  const { progress, active } = useProgress();

  useEffect(() => {
    setProgress(progress);
    setActive(active);
  }, [progress, active, setProgress, setActive]);

  return null;
}

function SceneContent() {
  const positionGroup = useRef();
  const rotationGroup = useRef();
  const bulbGroup = useRef();
  const lightRef = useRef();

  // ✅ Scroll animation - main model
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top 0%",
          end: "top -180%",
          scrub: 1,
        },
      })
        .to(positionGroup.current.position, {
          x: -4,
          y: -0.3,
          duration: 2,
          ease: "easeInOut",
        }, 0)
        .to(positionGroup.current.rotation, {
          x: -0.2, y: 2, z: 0, ease: "easeInOut", duration: 1
        }, 0);
    });
    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        delay: 1, // Start after initial load animation
      })
      .from(positionGroup.current.position, {
        x: 2,
        duration: 1,
        ease: "easeInOut",
      }, 0)
      });
      return () => ctx.revert();
  }, []);


  // ✅ Scroll animation - bulb
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top 0%",
          end: "top -140%",
          scrub: 1,
        },
      })
        .to(bulbGroup.current.position, {
          x: -6.2,
          y: 2.5,
          duration: 0.3,
          ease: "power2.inOut",
        });
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
      lightRef.current.intensity = 6 + Math.sin(clock.elapsedTime * 2) * 1.5;
    }
  });

  return (
    <>
      <Environment preset="sunset" />

      {/* MODEL */}
      <group ref={positionGroup}>
        <group ref={rotationGroup} scale={1.1}>
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
          <Float floatIntensity={1.2} rotationIntensity={1} floatingRange={[0, 0.2]}>
            <pointLight
              ref={lightRef}
              intensity={10}
              distance={10}
              color="#ffd966"
              decay={2}
            />
            <Bulb />
            <Cup />
            <Donut />
          </Float>
        </group>
      </group>
    </>
  );
}

export default function Scene({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded && !active && progress >= 100) {
      setHasLoaded(true);
      onLoaded?.();
    }
  }, [active, progress, hasLoaded, onLoaded]);

  return (
    <>
      {/* 🚀 Loader overlay (DOM, outside Canvas) */}
      <SoftechLoader progress={progress} active={active} />

      <Canvas
        className="w-full h-screen"
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[-2, 0, 5]} fov={50} />
        {/* ONE Suspense wraps everything so loader tracks all assets */}
        <Suspense fallback={null}>
          <LoaderBridge setProgress={setProgress} setActive={setActive} />
          <SceneContent />
        </Suspense>
      </Canvas>
    </>
  );
}

