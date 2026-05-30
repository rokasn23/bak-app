import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./ModelA";

export default function CanvasContent({
  leftSelection,
  rightSelection,
}) {
  const [playTrigger, setPlayTrigger] = useState(0);

  const finishedCount = useRef(0);
  //makes models start at the same time whenever either model's material gets changed
  useEffect(() => {
    finishedCount.current = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayTrigger((n) => n + 1);
  }, [leftSelection, rightSelection]);
  //makes models loop animation
  const handleAnimationFinished = useCallback(() => {
    finishedCount.current += 1;

    if (finishedCount.current === 2) {
      finishedCount.current = 0;

      setPlayTrigger((n) => n + 1);
    }
  }, []);

  return (
    <Canvas camera={{ position: [9, 3, 2], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[1, 0, 0]} intensity={1} />
      <directionalLight position={[-1, 0, 0]} intensity={1} />
      <directionalLight position={[0, 1, 0]} intensity={1} />
      <directionalLight position={[0, -1, 0]} intensity={1} />

      <Model
        url="./models/baka.glb"
        selectedMaterial={leftSelection}
        position={[-1.5, -3, 0]}
        onAnimationFinished={handleAnimationFinished}
        baseColor={"#80AFFF"}
        playTrigger={playTrigger}
      />

      <Model
        url="./models/baka.glb"
        selectedMaterial={rightSelection}
        position={[1.5, -3, 0]}
        onAnimationFinished={handleAnimationFinished}
        baseColor={"#FF8A6E"}
        playTrigger={playTrigger}
      />

      <OrbitControls
        minDistance={5}
        maxDistance={13}
      />
    </Canvas>
  );
}