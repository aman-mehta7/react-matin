
// import { useGLTF } from '@react-three/drei'

// export default function Donut(props) {
//   const { nodes } = useGLTF('model/Mycloud.glb')
//   return (
//     <group {...props} dispose={null} >
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.SurfPatch.geometry}
//         material={nodes.SurfPatch.material}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Mball022.geometry}
//         material={nodes.Mball022.material}
//       />
//     </group>
//   )
// }

// useGLTF.preload('model/Mycloud.glb')








// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Donut(props) {
  const { nodes } = useGLTF('model/Mycloud.glb')
  return (
    
    <group {...props} dispose={null} scale={0.15} rotation={[0,1.5,0]} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SurfPatch.geometry}
        material={nodes.SurfPatch.material}
        position={[-0.107, 0.919, 0.61]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SurfPatch001.geometry}
        material={nodes.SurfPatch001.material}
        position={[-0.468, 0.973, 0.841]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mball045.geometry}
        material={nodes.Mball045.material}
        position={[-0.793, 1.694, 1.089]}
      />
    </group>
  )
}

useGLTF.preload('model/Mycloud.glb')
