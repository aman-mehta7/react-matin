

// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Donut(props) {
  const { nodes, materials } = useGLTF('model/donut3.glb')
  return (
    <group {...props} dispose={null} scale={.3} position={[3.4, 1, 0]} rotation={[-.9, Math.PI / 2.5, Math.PI / 2]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.donut.geometry}
        material={materials.Poliigon_FoodPastryDonut_10737_2K}
        position={[0, -0.035, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.icing.geometry}
          material={materials.Poliigon_FoodGlazeStrawberry_10739_2K}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('model/donut3.glb')
