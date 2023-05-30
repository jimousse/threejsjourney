import { useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, meshBounds } from '@react-three/drei';
import { useRef } from 'react';

export default function Experience() {
  const cube = useRef();
  const hamburger = useGLTF('./hamburger.glb');

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = () => {
    console.log('event happened');
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        position-x={-2}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onPointerEnter={(event) => {
          event.stopPropagation();
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        onClick={eventHandler}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default';
        }}
        ref={cube}
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.75}
        onClick={(event) => {
          console.log('click', event.object.name);
        }}
      />
    </>
  );
}
