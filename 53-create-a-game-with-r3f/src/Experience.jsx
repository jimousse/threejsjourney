import Lights from './Lights.jsx';
import { Physics, Debug } from '@react-three/rapier';
import { BlockAxe, BlockLimbo, BlockSpinner } from './Level';
import Level from './Level';
import Player from './Player';
import { Perf } from 'r3f-perf';
import useGame from './stores/useGame';
import Effects from './Effects.jsx';

export default function Experience() {
  const blockCount = useGame((state) => state.blockCount);
  const blockSeed = useGame((state) => state.blockSeed);
  const types = [BlockSpinner, BlockAxe, BlockLimbo];
  return (
    <>
      {/* <Perf position="top-left" /> */}

      <color args={['#bdedfc']} attach="background" />

      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blockCount} types={types} seed={blockSeed} />
        <Player />
      </Physics>
      <Effects />
    </>
  );
}
