import { useEffect, useRef, Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Model = lazy(() =>
  import("../model/model").then((m) => ({ default: m.Model }))
);

/**
 * EASY CONTROL AREA
 *
 * Edit only these values:
 * x, y, z      -> model position
 * rotX, rotY   -> model rotation in radians
 * scale        -> model size
 *
 * Each object matches one section id from App.jsx.
 */
const MODEL_STATES = [
  {
    id: "hero",
    x: 2 ,
    y: 0,
    z: 0,
    rotX: 0,
    rotY: 0,
    scale: 1,
  },
  {
    id: "page2",
    x: -2.5,
    y: 0.5,
    z: 0,
    rotX: 0,
    rotY: 2,
    scale: 1,
  },
  {
    id: "page3",
    x: 1,
    y: 0,
    z: 0,
    rotX: 2,
    rotY: 2,
    scale: 1.4,
  },
  {
    id: "choose-us",
    x: 2,
    y: 0,
    z: 0,
    rotX: 0,
    rotY: -1,
    scale: 1.2,
  },
  {
    id: "how-work",
    x: 2.2,
    y: -0.1,
    z: 0,
    rotX: 2,
    rotY: -1,
    scale: 0.7,
  },
  {
    id: "portfolio",
    x: -2,
    y: -1.5,
    z: 0,
    rotX: 7,
    rotY: 5,
    scale: 0.5,
  },
  {
    id: "services",
    x: -2.2,
    y: 0.2,
    z: 0,
    rotX: -0.1,
    rotY: 1.2,
    scale: 1,
  },
  {
    id: "testimonials",
    x: 2.3,
    y: 2,
    z: 0,
    rotX: 0.05,
    rotY: -1.4,
    scale: 0.8,
  },
  {
    id: "latest-blogs",
    x: -1.8,
    y: -0.1,
    z: 0,
    rotX: 0,
    rotY: 1,
    scale: 0.85,
  },
  {
    id: "our-office",
    x: 1.8,
    y: 0.1,
    z: 0,
    rotX: 0.1,
    rotY: -0.8,
    scale: 1.2,
  },
  {
    id: "our-clients",
    x: -2,
    y: 0,
    z: 0,
    rotX: 0,
    rotY: 1.3,
    scale: 1,
  },
  {
    id: "footer",
    x: 0,
    y: 0,
    z: 0,
    rotX: 0,
    rotY: 0,
    scale: 0.9,
  },
];

const FOLLOW_SPEED = 10;

function lerpState(from, to, progress) {
  return {
    x: THREE.MathUtils.lerp(from.x, to.x, progress),
    y: THREE.MathUtils.lerp(from.y, to.y, progress),
    z: THREE.MathUtils.lerp(from.z, to.z, progress),
    rotX: THREE.MathUtils.lerp(from.rotX, to.rotX, progress),
    rotY: THREE.MathUtils.lerp(from.rotY, to.rotY, progress),
    scale: THREE.MathUtils.lerp(from.scale, to.scale, progress),
  };
}

function SceneContent() {
  const cameraRef = useRef(null);
  const modelRef = useRef(null);

  const target = useRef({
    x: MODEL_STATES[0].x,
    y: MODEL_STATES[0].y,
    z: MODEL_STATES[0].z,
    rotX: MODEL_STATES[0].rotX,
    rotY: MODEL_STATES[0].rotY,
    scale: MODEL_STATES[0].scale,
  });

  useEffect(() => {
    const triggers = [];

    MODEL_STATES.forEach((state, index) => {
      const section = document.querySelector(`#${state.id}`);
      if (!section) return;

      const nextState = MODEL_STATES[index + 1] || state;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",

        onUpdate: (self) => {
          const newState = lerpState(state, nextState, self.progress);

          target.current.x = newState.x;
          target.current.y = newState.y;
          target.current.z = newState.z;
          target.current.rotX = newState.rotX;
          target.current.rotY = newState.rotY;
          target.current.scale = newState.scale;
        },
      });

      triggers.push(trigger);
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  useFrame((_, delta) => {
    if (!modelRef.current || !cameraRef.current) return;

    const t = 1 - Math.exp(-FOLLOW_SPEED * delta);

    cameraRef.current.position.set(0, 0, 5);
    cameraRef.current.lookAt(0, 0, 0);

    modelRef.current.position.x = THREE.MathUtils.lerp(
      modelRef.current.position.x,
      target.current.x,
      t
    );

    modelRef.current.position.y = THREE.MathUtils.lerp(
      modelRef.current.position.y,
      target.current.y,
      t
    );

    modelRef.current.position.z = THREE.MathUtils.lerp(
      modelRef.current.position.z,
      target.current.z,
      t
    );

    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      target.current.rotX,
      t
    );

    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      target.current.rotY,
      t
    );

    const newScale = THREE.MathUtils.lerp(
      modelRef.current.scale.x,
      target.current.scale,
      t
    );

    modelRef.current.scale.set(newScale, newScale, newScale);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />

      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      <Environment preset="sunset" />

      <group ref={modelRef}>
        <Center>
          <Model />
        </Center>
      </group>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={Math.min(window.devicePixelRatio, 2)}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
      }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}