import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

//this needs more animations to loop better, because React does D:
function CanvasContent({ slider }) {
  const group = useRef();
  const waterObj = useRef(null);

  const { scene, animations } = useGLTF("./models/bakb.glb");
  const { actions, mixer } = useAnimations(animations, group);

  const state = useRef({
    phase: 1,
    iceTriggered: false,
  });

  //starts animation after page loaded
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.name.startsWith("Particles")) obj.visible = false;
    });

    const p1 = scene.getObjectByName("Particles1");

    if (p1) p1.visible = true;

    const action = actions["Particles1"];
    if (action) {
      action.reset().play();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }
  }, [scene, actions]);

  useEffect(() => {
    const obj = scene.getObjectByName("WaterObj");
    if (obj) waterObj.current = obj;
  }, [scene]);

  //slider logic
  useEffect(() => {
    const pct = slider;
    //moves water tube along its direction
    if (waterObj.current) {
      waterObj.current.position.z = -((pct / 100) * 1.85 - 1);
      waterObj.current.position.y = (pct / 100) + (pct / 100) * 0.2 + 3;
    }

    const newPhase = Math.min(5, Math.floor(pct / 20) + 1);

    if (newPhase === state.current.phase) return;
    state.current.phase = newPhase;

    //hides all particles ...lazy
    scene.traverse((o) => {
      if (o.name.startsWith("Particles")) o.visible = false;
    });

    const target = `Particles${newPhase}`;
    const obj = scene.getObjectByName(target);
    if (obj) obj.visible = true;

    const action = actions[target];

    //ice melting sequnce when when bottom is heated
    if (newPhase === 5 && !state.current.iceTriggered) {
      state.current.iceTriggered = true;

      setTimeout(() => {
        const ice = actions["Ice"];

        if (ice) {
          ice.reset();
          ice.setLoop(THREE.LoopOnce, 1);
          ice.clampWhenFinished = true;
          ice.play();

          setTimeout(() => {
            const p5 = actions["Particles5"];
            const obj5 = scene.getObjectByName("Particles5");

            if (obj5 && p5) {
              obj5.visible = true;
              p5.reset().play();
            }
          }, 3000);
        }
      }, 2000);
    }
    else if (action) {
      action.reset().play();
    }

  }, [slider, scene, actions, mixer]);
  

  useFrame((_, delta) => {
    mixer?.update(delta);
  });

  return (
    <group ref={group}>
      <primitive
        object={scene}
        position={[0, -2, 0]}
      />
    </group>
  );
}

export default function Scene({ slider }) {
  return (
    <Canvas camera={{ position: [9, 3, 2], fov: 50}}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 1, 0]} intensity={2} />
      <CanvasContent slider={slider} />

      <OrbitControls />
    </Canvas>
  );
}