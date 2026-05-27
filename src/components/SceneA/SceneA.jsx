import { useState } from "react";
import Canvas from "./CanvasA";
import Sidebar from "./SidebarA";

export default function App() {
  const [leftSelection, setLeftSelection] = useState("Steel");
  const [rightSelection, setRightSelection] = useState("Copper");

  return (
    <div className="scene-layer">
      <div className="canvas-layer">
        <Canvas
          leftSelection={leftSelection}
          rightSelection={rightSelection}
        />
      </div>
      
      <Sidebar
        leftSelection={leftSelection}
        rightSelection={rightSelection}
        setLeftSelection={setLeftSelection}
        setRightSelection={setRightSelection}
      />
    </div>
  );
}