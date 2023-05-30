import {
  PresentationControls,
  Float,
  Environment,
  useGLTF,
  ContactShadows,
  Html,
  Text,
} from '@react-three/drei';

export default function Experience() {
  const computer = useGLTF('./model.gltf');
  const rings = useGLTF('./classic_golden_wedding_rings/scene.gltf');
  return (
    <>
      <Environment preset="city" />
      <color args={['#241a1a']} attach="background" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 50 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={'#71b1ca'}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          {/* <primitive object={computer.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://jimmycastex.com" />
            </Html>
          </primitive> */}
          <primitive object={rings.scene} position-y={-1.2} scale={0.2}>
            {/* <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://jimmycastex.com" />
            </Html> */}
          </primitive>

          <Text
            font="/bangers-v20-latin-regular.woff"
            fontSize={1}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            maxWidth={2}
            textAlign={'center'}
          >
            Jimmy Castex
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows opacity={0.4} position-y={-1.4} scale={5} blue={2.4} />
    </>
  );
}
