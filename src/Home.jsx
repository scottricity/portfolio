import logo from './logo.svg';
import React, { useRef , useState , useReducer , useEffect , Suspense } from "react";
import { Button, Container, Typography } from '@mui/material';
import GLBFile from "./scottricity_3d_text.glb"
import WebGL from "three/examples/jsm/capabilities/WebGL"
import { Canvas, useFrame , useLoader } from '@react-three/fiber'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import { Vector3 } from 'three';

function TitleText(props) {
  const gltf = useLoader(GLTFLoader, GLBFile)
  return (
    <Suspense fallback={null}>
      <mesh {...props}>
      <primitive object={gltf.scene}>
      </primitive>
      </mesh>
    </Suspense>
  )
}

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}

function App() {
  if (!WebGL.isWebGLAvailable) {
    return (
      <Typography>You require WebGL to view this site's content.</Typography>
    )
  }
  return (
    <Canvas style={{'height': window.innerHeight, 'margin': "0px", "padding": "0px"}}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} color='#7289da' />
      <TitleText position={[53,34,-35]} rotation={[Math.PI / 2, Math.PI / 2, 0.4]}/>
    </Canvas>
  );
}

export default App;
