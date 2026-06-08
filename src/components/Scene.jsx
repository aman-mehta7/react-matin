import { useEffect, useRef, Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Center,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Model = lazy(() =>
  import("../model/model").then((m) => ({ default: m.Model }))
);

gsap.registerPlugin(ScrollTrigger);

function SceneContent() {
  const cameraRef = useRef();
  const modelRef = useRef();
  const mainLight = useRef();
  const rimLight = useRef();

  const target = useRef({
    modelX: 2,
    rotY: 0,
    rotX: 0,
    lightIntensity: 1,
    rimIntensity: 0.5,
    lightX: 5,
    lightY: 5,
  });

  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        ease: "easeInOut",
        onUpdate: () => {
          isScrolling.current = true;
          clearTimeout(scrollTimeout.current);
          scrollTimeout.current = setTimeout(() => {
            isScrolling.current = false;
          }, 150);
        },
      },
    });

    // HERO → Right
    tl.to(target.current, {
      modelX: 0,
      rotY: -0.5,
      rotX: 0.05,
      lightIntensity: 1.2,
      rimIntensity: 0.6,
      lightX: 5,
      lightY: 6,
    }, 0)

    // PAGE2 → Left
    .to(target.current, {
      modelX: -2.5,
      rotY: 0.6,
      rotX: -0.05,
      lightIntensity: 1,
      rimIntensity: 0.5,
      lightX: -4,
      lightY: 5,
    }, 0)

    // PAGE3 → Right
    .to(target.current, {
      modelX: 2.5,
      rotY: -0.7,
      rotX: 0.04,
      lightIntensity: 1.3,
      rimIntensity: 0.7,
      lightX: 6,
      lightY: 4,
    }, 1)

    // CHOOSE US → Left
    .to(target.current, {
      modelX: -2.5,
      rotY: 0.8,
      rotX: -0.03,
      lightIntensity: 0.9,
      rimIntensity: 0.6,
      lightX: -5,
      lightY: 6,
    }, 2)

    // HOW WORK → Right
    .to(target.current, {
      modelX: 2,
      rotY: -0.6,
      rotX: 0.02,
      lightIntensity: 1.4,
      rimIntensity: 0.8,
      lightX: 5,
      lightY: 7,
    }, 4)

    // PORTFOLIO → Center
    .to(target.current, {
      modelX: 0,
      rotY: 0,
      rotX: 0,
      lightIntensity: 0.8,
      rimIntensity: 0.4,
      lightX: 4,
      lightY: 5,
    }, 5);

  }, []);

  useFrame((state, delta) => {
    const t = 1 - Math.exp(-4 * delta);

    // Keep camera stable
    cameraRef.current.position.set(0, 0, 5);
    cameraRef.current.lookAt(0, 0, 0);

    // Smooth left-right position
    modelRef.current.position.x = THREE.MathUtils.lerp(
      modelRef.current.position.x,
      target.current.modelX,
      t
    );

    // Smooth rotation Y
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      target.current.rotY,
      t
    );

    // Smooth rotation X
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      target.current.rotX,
      t
    );

    // Light intensity animation
    mainLight.current.intensity = THREE.MathUtils.lerp(
      mainLight.current.intensity,
      target.current.lightIntensity,
      t
    );

    rimLight.current.intensity = THREE.MathUtils.lerp(
      rimLight.current.intensity,
      target.current.rimIntensity,
      t
    );

    // Light position animation
    mainLight.current.position.x = THREE.MathUtils.lerp(
      mainLight.current.position.x,
      target.current.lightX,
      t
    );

    mainLight.current.position.y = THREE.MathUtils.lerp(
      mainLight.current.position.y,
      target.current.lightY,
      t
    );

    // Micro idle hover when not scrolling
    if (!isScrolling.current) {
      const idleTime = state.clock.elapsedTime;
      modelRef.current.position.y = Math.sin(idleTime * 0.7) * 0.05;
      modelRef.current.rotation.y += Math.sin(idleTime * 0.5) * 0.001;
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />

      <ambientLight intensity={0.35} />

      <directionalLight
        ref={mainLight}
        position={[5, 5, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <directionalLight
        ref={rimLight}
        position={[-5, 3, -5]}
        intensity={0.5}
        color="#4da6ff"
      />

      <Environment preset="city" />

      <group ref={modelRef} castShadow receiveShadow>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.25}>
          <Center>
            <Model />
          </Center>
        </Float>
      </group>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.25} />
      </mesh>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}