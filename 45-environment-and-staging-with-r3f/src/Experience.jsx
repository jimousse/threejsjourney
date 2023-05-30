import { useFrame } from '@react-three/fiber';
import {
  AccumulativeShadows,
  RandomizedLight,
  SoftShadows,
  BakeShadows,
  OrbitControls,
  Sky,
  useHelper,
  Environment,
  Lightformer,
} from '@react-three/drei';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import * as THREE from 'three';

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const { sunPosition } = useControls('sky', {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity } = useControls('envMapIntensity', {
    envMapIntensity: { value: 1, min: 0, max: 12 },
  });

  return (
    <>
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      <Environment
        // background
        // files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
        preset="sunset"
        ground={{
          height: 7,
          radius: 28,
          scale: 100,
        }}
      >
        <color args={['#000']} attach="background" />
        <Lightformer
          position-z={-5}
          scale={10}
          color="red"
          intensity={1.5}
          form="ring"
        />
        {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[1, 0, 0]} />
        </mesh> */}
      </Environment>

      <SoftShadows
        frustum={3.75}
        size={0.005}
        near={9.5}
        samples={14}
        rings={11}
      />
      {/* <BakeShadows /> */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* <directionalLight
        ref={directionalLight}
        castShadow
        position={sunPosition}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} />

      <Sky sunPosition={sunPosition} /> */}

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh>
      <mesh castShadow ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
