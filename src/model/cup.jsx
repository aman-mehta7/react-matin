

// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Cup(props) {
  const { nodes, materials } = useGLTF('model/cup2.glb')
  return (
    <group {...props} dispose={null} scale={.29} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cup.geometry}
        material={materials['Material.001']}
        rotation={[0, -0.355, 0]}
      />
    </group>
  )
}

useGLTF.preload('model/cup2.glb')
