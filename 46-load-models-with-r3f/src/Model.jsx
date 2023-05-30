import { useGLTF, Clone } from '@react-three/drei';
import Hamburger from './Hamburger';

export default function Model() {
  return (
    <>
      <Hamburger scale={0.35} position-x={-4} />
    </>
  );
}
