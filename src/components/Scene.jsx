import { useEffect, useRef, Suspense, lazy, } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, PerspectiveCamera, Environment,Float } from "@react-three/drei";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bulb from "../model/Bulb";
import Cup from "../model/cup";
const Donut = lazy(() => import("../model/donut"));
// import SoftechLoader from "./Loader";

const Model = lazy(() =>
  import("../model/model").then((m) => ({ default: m.Model }))
);

/* ===============================
   MAIN MODEL STATES
================================ */

const MODEL_STATES = [
  { id: "hero", x: 2, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
  { id: "page2", x: -2.5, y: 0, z: 0, rotX: 0, rotY: 2, rotZ: 0.3, scale: 1 },
  { id: "page3", x: 1, y: 0, z: 0, rotX: 0, rotY: 2, rotZ: -0.9, scale: 1 },
  { id: "choose-us", x: 2, y: 0, z: 0, rotX: 0, rotY: -1, rotZ: 0.2, scale: 1.2 },
  { id: "how-work", x: 0, y: 0, z: 0, rotX: 0, rotY: -1, rotZ: -0.3, scale: 0.7 },
  { id: "portfolio", x: -2.5, y: -0.8, z: 0, rotX: 0, rotY: 3, rotZ: -0.6, scale: 0.5 },
  { id: "testimonals", x: -2.5, y: -0.8, z: 0, rotX: 0, rotY: 8, rotZ: -.6, scale: 0.9 },
  { id: "LatestBlog", x: 0, y: 0, z: -6, rotX: 0, rotY: 0, rotZ: -0.6, scale: 0 },
  // { id: "OurOffice", x: 2, y: 8, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 0.9 },
  // { id: "OurClients", x: -8, y: 10, z: 0, rotX: 0, rotY: 2, rotZ: 0, scale: 1 },
  // { id: "SuscribeSection", x: -2.5, y: -0.6, z: 0, rotX: 0, rotY: 8, rotZ: 0, scale: 0.5 },
  // { id: "Footer", x: -2.5, y: -2.5, z: 0, rotX: 0, rotY: 8, rotZ: 0, scale: 0.5 },
];

/* ===============================
   SUB MODEL STATES (FULL CONTROL)
================================ */

const SUB_STATES = [
  {
    id: "hero",
    radius: 2,
    offsetX: .5,
    offsetY: 0,
    offsetZ: 0,
    scale: 1,
  },
  {
    id: "page2",
    radius: 2,
    offsetX: -1,
    offsetY: 0,
    offsetZ: 0,
    scale: 1,
  },
  {
    id: "page3",
    radius: 2.5,
    offsetX: 1.5,
    offsetY: 0.3,
    offsetZ: 0,
    scale: 0,
  },
  {
    id: "choose-us",
    radius: 2.1,
    offsetX: 1,
    offsetY: 0.5,
    offsetZ: 0,
    scale: 1,
  },
  {
    id: "how-work",
    radius: 1.2,
    offsetX: 0.5,
    offsetY: -0.3,
    offsetZ: 0,
    scale: 0.5,
  },
  {
    id: "portfolio",
    radius: 1.2,
    offsetX: -1,
    offsetY: 0,
    offsetZ: 0,
    scale: .5,
  },
  {
    id: "testimonals",
    radius: 1.2,
    offsetX: -1,
    offsetY: 0,
    offsetZ: 0,
    scale: .5,
  },
  {
    id: "LatestBlog",
    radius: 0,
    offsetX: -1,
    offsetY: 0,
    offsetZ: 0,
    scale: 0,
  },
  // {
  //   id: "OurOffice",
  //   radius: 1,
  //   offsetX: 1,
  //   offsetY: 0.2,
  //   offsetZ: 0,
  //   scale: 0,
  // },
];

const FOLLOW_SPEED = 10;

function lerpState(from, to, progress) {
  return {
    x: THREE.MathUtils.lerp(from.x, to.x, progress),
    y: THREE.MathUtils.lerp(from.y, to.y, progress),
    z: THREE.MathUtils.lerp(from.z, to.z, progress),
    rotX: THREE.MathUtils.lerp(from.rotX, to.rotX, progress),
    rotY: THREE.MathUtils.lerp(from.rotY, to.rotY, progress),
    rotZ: THREE.MathUtils.lerp(from.rotZ, to.rotZ, progress),
    scale: THREE.MathUtils.lerp(from.scale, to.scale, progress),
  };
}

function SceneContent({ mouse }) {
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const subGroupRef = useRef(null);

  const target = useRef({ ...MODEL_STATES[0] });
  const subTarget = useRef({
    radius: 2,
    offsetX: .7,
    offsetY: 0,
    offsetZ: 0,
    scale: 0.9,
  });

  const smoothMouse = useRef({ x: 0, y: 0 });

  /* ===============================
     ScrollTrigger Setup
  ================================= */

  useEffect(() => {
    const triggers = [];

    /* MAIN MODEL */
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
          Object.assign(target.current, newState);
        },
      });

      triggers.push(trigger);
    });

    /* SUB MODELS */
    SUB_STATES.forEach((state, index) => {
      const section = document.querySelector(`#${state.id}`);
      if (!section) return;

      const nextState = SUB_STATES[index + 1] || state;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          subTarget.current.radius = THREE.MathUtils.lerp(
            state.radius,
            nextState.radius,
            self.progress
          );

          subTarget.current.offsetX = THREE.MathUtils.lerp(
            state.offsetX,
            nextState.offsetX,
            self.progress
          );

          subTarget.current.offsetY = THREE.MathUtils.lerp(
            state.offsetY,
            nextState.offsetY,
            self.progress
          );

          subTarget.current.offsetZ = THREE.MathUtils.lerp(
            state.offsetZ,
            nextState.offsetZ,
            self.progress
          );

          subTarget.current.scale = THREE.MathUtils.lerp(
            state.scale,
            nextState.scale,
            self.progress
          );
        },
      });

      triggers.push(trigger);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => triggers.forEach((t) => t.kill());
  }, []);

  /* ===============================
     Frame Loop
  ================================= */

useFrame((state, delta) => {
  if (!modelRef.current || !cameraRef.current) return;

  const t = 1 - Math.exp(-FOLLOW_SPEED * delta);
  const time = state.clock.elapsedTime;

  const mouseX = mouse?.current?.x ?? 0;
  const mouseY = mouse?.current?.y ?? 0;

  /* -------------------------
     Smooth Mouse
  -------------------------- */

  smoothMouse.current.x +=
    (mouseX - smoothMouse.current.x) * t;

  smoothMouse.current.y +=
    (mouseY - smoothMouse.current.y) * t;

  /* -------------------------
     Camera
  -------------------------- */

  cameraRef.current.position.set(0, 0, 5);
  cameraRef.current.lookAt(0, 0, 0);

  /* -------------------------
     POSITION
  -------------------------- */

  modelRef.current.position.x +=
    (target.current.x - modelRef.current.position.x) * t;

  modelRef.current.position.y +=
    (target.current.y - modelRef.current.position.y) * t;

  /* -------------------------
     ROTATION (main model)
  -------------------------- */

  const desiredRotX =
    target.current.rotX + smoothMouse.current.y * -0.04;

  const desiredRotY =
    target.current.rotY + smoothMouse.current.x * 0.1;

  modelRef.current.rotation.x +=
    (desiredRotX - modelRef.current.rotation.x) * t;

  modelRef.current.rotation.y +=
    (desiredRotY - modelRef.current.rotation.y) * t;

  modelRef.current.rotation.z +=
    (target.current.rotZ - modelRef.current.rotation.z) * t;

  /* -------------------------
     SCALE (main model)
  -------------------------- */

  const desiredScale = target.current.scale;

  modelRef.current.scale.x +=
    (desiredScale - modelRef.current.scale.x) * t;

  modelRef.current.scale.y =
    modelRef.current.scale.x;

  modelRef.current.scale.z =
    modelRef.current.scale.x;

  /* ===============================
     SUB MODEL RING WITH ORBIT
  ================================= */

  if (subGroupRef.current) {
    const children = subGroupRef.current.children;
    const total = children.length;

    const { radius, offsetX, offsetY, offsetZ, scale } =
      subTarget.current;

    // Follow main model position with offset
    subGroupRef.current.position.set(
      modelRef.current.position.x + offsetX,
      modelRef.current.position.y + offsetY,
      modelRef.current.position.z + offsetZ
    );

    const orbitSpeed = 0.8;

    children.forEach((child, i) => {
      const angle =
        (i / total) * Math.PI * 2 +
        time * orbitSpeed;

      // Orbit ring
      child.position.x = Math.cos(angle) * radius;
      child.position.y = Math.sin(angle) * radius;
      child.position.z = -2;

      child.scale.setScalar(scale);
    });
  }
});

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />
      <Environment preset="sunset" />

      <group ref={modelRef}>
        <Float>
        <Center>
          <Model />
        </Center>
        </Float>
      </group>

  <group ref={subGroupRef}>
  <group scale={0.5}>
    <Cup />
  </group>

  <group scale={0.3}>
    <Bulb />
  </group>

  <group scale={0.4}>
    <Donut />
  </group>
</group>
    </>
  );
}

export default function Scene({ mouse }) {
  // const [loaderState, setLoaderState] = useState({ active: false, progress: 0 });

  return (
      // <SoftechLoader progress={loaderState.progress} active={loaderState.active} />
    <>

      <Canvas
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} />
        </Suspense>
      </Canvas>
    </>
      // <LoaderBridge setLoaderState={setLoaderState} />
  );
}

// function LoaderBridge({ setLoaderState }) {
//   const { active, progress } = useProgress();

//   useEffect(() => {
//     setLoaderState({ active, progress });
//   }, [active, progress, setLoaderState]);

//   return null;
// }