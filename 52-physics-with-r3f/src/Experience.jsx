import { OrbitControls, useGLTF } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import {
  CylinderCollider,
  BallCollider,
  CuboidCollider,
  Debug,
  Physics,
  RigidBody,
  InstancedRigidBodies,
} from '@react-three/rapier';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Experience() {
  const cubesCount = 500;
  const cubes = useRef();
  const [hitSound] = useState(() => new Audio('./hit.mp3'));
  const twister = useRef();
  const cube = useRef();
  const cubeJump = () => {
    const mass = cube.current.mass;
    cube.current.applyImpulse({ x: -5, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: 10 * Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  const hamburger = useGLTF('./hamburger.glb');

  const cubeTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];
    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ]);
      rotations.push([Math.random(), Math.random(), Math.random()]);

      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }
    return { positions, rotations, scales };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle);
    const z = Math.sin(angle);
    twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  const collisionEnter = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  };

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.81, 0]}>
        {/* <Debug /> */}
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation-x={Math.PI * 0.5}
        >
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[-Math.PI * 0.35, 0, 0]}
          />
          <BallCollider args={[1.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          gravityScale={1}
          restitution={0}
          friction={0}
          colliders={false}
          onCollisionEnter={collisionEnter}
        >
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[15, 0.5, 15]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          {/* <CylinderCollider args={[0.25, 1.25]} /> */}
        </RigidBody>

        {/* <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody> */}
        <InstancedRigidBodies
          positions={cubeTransforms.positions}
          rotations={cubeTransforms.rotations}
          scales={cubeTransforms.scales}
        >
          <instancedMesh
            ref={cubes}
            castShadow
            receiveShadow
            args={[null, null, cubesCount]}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
