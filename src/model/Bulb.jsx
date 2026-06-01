
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Bulb(props) {
  const { nodes, materials } = useGLTF('model/bulb.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.043, 1.954, 0.878]} rotation={[0.34, 0.003, 0.09]} scale={0.123}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001_1.geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('model/bulb.glb')
