

// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Cup(props) {
  const { nodes, materials } = useGLTF('model/cup2.glb')
  return (
    <group {...props} dispose={null} scale={.25} position={[-1, -.75, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cup.geometry}
        material={materials['Material.001']}
        position={[2.869, 0.282, 2.037]}
        rotation={[0, -0.355, 0]}
      />
    </group>
  )
}

useGLTF.preload('model/cup2.glb')
