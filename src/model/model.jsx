

// // import React, { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'

// export function Model(props) {
//   const { nodes, materials } = useGLTF('model/MatinModel.glb')
//   return (
//       <group {...props} dispose={null} rotation={[0,Math.PI/0.72,0]} position={[ 2, -.75, 0]}>
//       <group
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015.geometry}
//           material={materials['Material.023']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_1.geometry}
//           material={materials['Material.008']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_2.geometry}
//           material={materials['Material.009']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_3.geometry}
//           material={materials['Material.022']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_4.geometry}
//           material={materials['Material.015']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_5.geometry}
//           material={materials['Material.014']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_6.geometry}
//           material={materials['Material.013']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_7.geometry}
//           material={materials['Material.018']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_8.geometry}
//           material={materials['Material.016']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_9.geometry}
//           material={materials['Material.019']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_10.geometry}
//           material={nodes.Torus015_10.material}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_11.geometry}
//           material={materials['Material.012']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_12.geometry}
//           material={materials['Material.005']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_13.geometry}
//           material={materials.Material}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_14.geometry}
//           material={materials['Material.010']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_15.geometry}
//           material={materials['Material.011']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_16.geometry}
//           material={materials['Material.025']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_17.geometry}
//           material={materials['Material.026']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_18.geometry}
//           material={materials['Material.024']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_19.geometry}
//           material={materials['Material.021']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_20.geometry}
//           material={materials['Material.020']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_21.geometry}
//           material={materials['Material.004']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_22.geometry}
//           material={materials['Material.001']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_23.geometry}
//           material={materials['Material.002']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_24.geometry}
//           material={materials['Material.003']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_25.geometry}
//           material={materials['Material.006']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_26.geometry}
//           material={materials['Material.007']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_27.geometry}
//           material={materials['matin-logo']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Torus015_28.geometry}
//           material={materials['matin-logo.001']}
//         />
//       </group>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus094.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus096.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus103.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus105.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus106.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus124.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus125.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus075.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus077.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus086.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus088.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Torus092.geometry}
//         material={materials['Material.001']}
//         position={[0.332, 0.284, 0.17]}
//         rotation={[2.238, -0.492, -1.161]}
//         scale={[0.518, 0.592, 0.429]}
//       />
//     </group>
//   )
// }

// useGLTF.preload('model/MatinModel.glb')


import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('model/MatinModel.glb')
  return (
    <group {...props} dispose={null} rotation={[0,Math.PI/0.72,0]} position={[ 2, -.75, 0]}>
      <group position={[0.906, 1.097, 0.023]} rotation={[Math.PI / 2, -0.435, -Math.PI / 2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_1.geometry}
          material={materials['MS logo']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_2.geometry}
          material={materials['Material.023']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_3.geometry}
          material={materials['Material.008']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_4.geometry}
          material={materials['Material.009']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_5.geometry}
          material={materials['Material.022']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_6.geometry}
          material={materials['Material.015']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_7.geometry}
          material={materials['Material.014']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_8.geometry}
          material={materials['Material.013']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_9.geometry}
          material={materials['Material.018']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_10.geometry}
          material={materials['Material.016']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_11.geometry}
          material={materials['Material.019']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_12.geometry}
          material={nodes.MS_logo_12.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_13.geometry}
          material={materials['Material.012']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_14.geometry}
          material={materials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_15.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_16.geometry}
          material={materials['Material.010']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_17.geometry}
          material={materials['Material.011']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_18.geometry}
          material={materials['Material.025']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_19.geometry}
          material={materials['Material.026']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_20.geometry}
          material={materials['Material.024']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_21.geometry}
          material={materials['Material.021']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_22.geometry}
          material={materials['Material.020']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_23.geometry}
          material={materials['Material.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_24.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_25.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_26.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_27.geometry}
          material={materials['Material.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MS_logo_28.geometry}
          material={materials['Material.007']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus096.geometry}
        material={materials['Material.001']}
        position={[0.332, 0.284, 0.17]}
        rotation={[2.238, -0.492, -1.161]}
        scale={[0.518, 0.592, 0.429]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus008.geometry}
        material={materials['Material.001']}
        position={[0.332, 0.284, 0.17]}
        rotation={[2.238, -0.492, -1.161]}
        scale={[0.518, 0.592, 0.429]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus011.geometry}
        material={materials['Material.001']}
        position={[0.332, 0.284, 0.17]}
        rotation={[2.238, -0.492, -1.161]}
        scale={[0.518, 0.592, 0.429]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus012.geometry}
        material={materials['Material.001']}
        position={[0.332, 0.284, 0.17]}
        rotation={[2.238, -0.492, -1.161]}
        scale={[0.518, 0.592, 0.429]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus022.geometry}
        material={materials['Material.001']}
        position={[0.332, 0.284, 0.17]}
        rotation={[2.238, -0.492, -1.161]}
        scale={[0.518, 0.592, 0.429]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus107.geometry}
        material={materials['Material.001']}
        position={[0.332, 0.284, 0.17]}
        rotation={[2.238, -0.492, -1.161]}
        scale={[0.518, 0.592, 0.429]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus109.geometry}
        material={materials['Material.001']}
        position={[0.332, 0.284, 0.17]}
        rotation={[2.238, -0.492, -1.161]}
        scale={[0.518, 0.592, 0.429]}
      />
    </group>
  )
}

useGLTF.preload('model/MatinModel.glb')