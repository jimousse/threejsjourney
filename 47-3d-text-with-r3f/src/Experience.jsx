import {
  Center,
  Text3D,
  OrbitControls,
  useMatcapTexture,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const [matcap] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91');
  const donuts = useRef([]);

  useEffect(() => {
    matcap.encoding = THREE.sRGBEncoding;
    matcap.needsUpdate = true;
    material.matcap = matcap;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          material={material}
          height={0.2}
          size={0.75}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          font="/fonts/helvetiker_regular.typeface.json"
        >
          Hello
        </Text3D>
      </Center>

      {[...Array(100)].map((value, index) => (
        <mesh
          ref={(el) => (donuts.current[index] = el)}
          geometry={torusGeometry}
          c
          material={material}
          key={index}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 * Math.random()}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  );
}
