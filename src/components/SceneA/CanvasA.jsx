import { useCallback, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./ModelA";

export default function CanvasContent({
  leftSelection,
  rightSelection,
}) {
  const leftRef = useRef();
  const rightRef = useRef();

  const finishedCount = useRef(0);
  const readyCount = useRef(0);

  const playBoth = useCallback(() => {
    finishedCount.current = 0;

    leftRef.current?.play();
    rightRef.current?.play();
  }, []);

  const handleAnimationFinished = useCallback(() => {
    finishedCount.current += 1;

    if (finishedCount.current === 2) {
      playBoth();
    }
  }, [playBoth]);

  //resets both when either material changes
  useEffect(() => {
    if (readyCount.current < 2) return;
    
    leftRef.current?.reset();
    rightRef.current?.reset();

    playBoth();
  }, [
    leftSelection,
    rightSelection,
    playBoth,
  ]);

  const handleReady = useCallback(() => {
    readyCount.current += 1;

    if (readyCount.current === 2) {
      playBoth();
    }
  }, [playBoth]);

  return (
    <Canvas camera={{ position: [9, 3, 2], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[1, 0, 0]} intensity={1} />
      <directionalLight position={[-1, 0, 0]} intensity={1} />
      <directionalLight position={[0, 1, 0]} intensity={1} />
      <directionalLight position={[0, -1, 0]} intensity={1} />

      <Model
        ref={leftRef}
        url="./models/baka.glb"
        selectedMaterial={leftSelection}
        position={[-1.5, -3, 0]}
        onAnimationFinished={handleAnimationFinished}
        onReady={handleReady}
      />

      <Model
        ref={rightRef}
        url="./models/baka.glb"
        selectedMaterial={rightSelection}
        position={[1.5, -3, 0]}
        onAnimationFinished={handleAnimationFinished}
        onReady={handleReady}
      />

      <OrbitControls 
        minDistance={5} 
        maxDistance={13}
      />
    </Canvas>
  );
}