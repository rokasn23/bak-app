import { useState } from "react";
import Canvas from "./CanvasC";
import Sidebar from "./SidebarC";

export default function App() {
  const [color, setColor] = useState(1); //1 = white, 0 = black
  const [roughness, setRoughness] = useState(0.5);
  const [metallic, setMetallic] = useState(0.5);
  const [ironZ, setIronZ] = useState(-1);
  const [temperature, setTemperature] = useState(20);

  const [sceneKey, setSceneKey] = useState(0);
  const resetScene = () => {
    setSceneKey((k) => k + 1);
    setColor(1);
    setRoughness(0.5);
    setMetallic(0.5);
    setIronZ(-1);
    setTemperature(20);
  };

  return (
      <div className="scene-layer">
        <div className="canvas-layer">
          <Canvas
            color={color}
            roughness={roughness}
            metallic={metallic}
            ironZ={ironZ}
            temperature={temperature}
            setTemperature={setTemperature}
            key={sceneKey}
          />
        </div>
          <Sidebar
            color={color}
            setColor={setColor}
            roughness={roughness}
            setRoughness={setRoughness}
            metallic={metallic}
            setMetallic={setMetallic}
            ironZ={ironZ}
            setIronZ={setIronZ}
            onReset={resetScene}
          />
      </div>

  );
}