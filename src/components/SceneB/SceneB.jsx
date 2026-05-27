import { useState } from "react";
import Canvas from "./CanvasB";
import Sidebar from "./SidebarB";

export default function App() {
  const [slider, setSlider] = useState(0);
  const [sceneKey, setSceneKey] = useState(0);

  const resetScene = () => {
    setSceneKey((k) => k + 1);
    setSlider(0);
  };

  return (
     <div className="scene-layer">
      <div className="canvas-layer">
        <Canvas
          slider={slider}
          key={sceneKey}
        />
      </div>
      <Sidebar
        value={slider}
        onChange={setSlider}
        onReset={resetScene}
      />
    </div>
  );
}