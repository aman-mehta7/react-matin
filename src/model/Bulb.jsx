import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Bulb(props) {
  const { nodes } = useGLTF("model/bulb.glb");
  const glassRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 4 + Math.sin(t * 1.5) * 0.3;

    if (glassRef.current) {
      glassRef.current.emissiveIntensity = pulse;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group
        // position={[-0.043, 1.954, 0.878]}
        // rotation={[0.34, 0.003, 0.09]}
        scale={0.2}
      >
        {/* ✅ TOP GLASS — GLOWING */}
        <mesh geometry={nodes.Sphere001.geometry}>
          <meshStandardMaterial
            ref={glassRef}
            // color="#000000"
            // emissive="#ffae42"
            emissiveIntensity={0.1}
            toneMapped={false}
          />
        </mesh>

        {/* ✅ BOTTOM METAL — NO GLOW */}
        <mesh geometry={nodes.Sphere001_1.geometry}>
          <meshStandardMaterial
            color="#cccccc"
            metalness={3}
            roughness={0.3}
            //  emissive="#ffae42"
             emissive="#ff0303"
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("model/bulb.glb");