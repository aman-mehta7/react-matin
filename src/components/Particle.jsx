

"use no memo";


import { useRef, useMemo } from "react";


import { useFrame } from "@react-three/fiber";

const Particles = ({ count = 200 }) => {
  const mesh = useRef();

  // ✅ Create particle data once
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 10 + 5,
        z: (Math.random() - 0.5) * 10,
        speed: 0.01 + Math.random() * 0.01,
      });
    }
    return temp;
  }, [count]);

  // ✅ Create positions buffer once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [particles, count]);

  useFrame(() => {
    if (!mesh.current) return;

    const pos = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= particles[i].speed;

      // Reset particle when below threshold
      if (pos[i * 3 + 1] < -2) {
        pos[i * 3 + 1] = Math.random() * 10 + 5;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#000000"
        size={0.06}
        transparent
        opacity={1}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
};

export default Particles;
