import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function CanvasContent({
  color,
  roughness,
  metallic,
  ironZ,
  temperature,
  setTemperature,
}) {
  const { scene } = useGLTF("./models/bakc.glb");

  const targetRef = useRef();
  const ironRef = useRef();

  useEffect(() => {
    const target = scene.getObjectByName("Target");
    const iron = scene.getObjectByName("Iron");

    //pasirodo three js negali keisti Blender-yje sukurto teksto
    const blenderText = scene.getObjectByName("Text");
    if (blenderText) blenderText.visible = false;

    if (target) {
      targetRef.current = target;

      target.material = target.material.clone();
    }

    if (iron) {
      ironRef.current = iron;
    }
  }, [scene]);

  //updates target materials
  useEffect(() => {
    if (!targetRef.current) return;

    const grayscale = new THREE.Color(color, color, color);

    targetRef.current.material.color = grayscale;
    targetRef.current.material.roughness = roughness;
    targetRef.current.material.metalness = metallic;

    targetRef.current.material.needsUpdate = true;
  }, [color, roughness, metallic]);

  //updates iron position
  useEffect(() => {
    if (!ironRef.current) return;

    ironRef.current.position.z = ironZ - 2;
  }, [ironZ]);

  useFrame((_, delta) => {
    const distanceFactor = 1 - Math.min(Math.abs(ironZ) / 2, 1);

    const absorbtionFactor = 1 - color;

    const roughnessFactor = roughness;

    //blizgumas
    const metallicFactor = 1 - metallic;

    const heatRate =
      distanceFactor *
      (0.4 + absorbtionFactor * 0.8) *
      (0.5 + roughnessFactor * 0.5) *
      (0.5 + metallicFactor * 0.5);

    setTemperature((prev) => {
      let next = prev;

      if (distanceFactor > 0.02) {
        next += heatRate * delta * 2;
      } else {
        //cools off if iron is too far
        next -= 
          (0.4 + absorbtionFactor * 0.8) *
          (0.5 + roughnessFactor * 0.5) *
          (0.5 + metallicFactor * 0.5) *
          delta * 0.4;
      }

      //clamps temperature
      next = Math.max(20, Math.min(100, next));

      return next;
    });
  });
  //at this point ive had read docs enough to figure out "...props"
  return (
    <>
      <primitive object={scene} position={[0, -2, 0]} />

      <Text
        position={[0.5, 0.28, 1.88]}
        rotation={[3.14*0.5, 3.14, 3.14*-0.5]}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {temperature.toFixed(1)}°C
      </Text>

      <ambientLight intensity={1} />
      <directionalLight position={[1, 0, 0]} intensity={1} />
      <directionalLight position={[-1, 0, 0]} intensity={1} />
      <directionalLight position={[0, 1, 0]} intensity={1} />
      <directionalLight position={[0, 0, -1]} intensity={1} />
      <directionalLight position={[0, 0, 1]} intensity={1} />
      <directionalLight position={[1, 1, 0]} intensity={1} />

      <OrbitControls />
    </>
  );
}

export default function Scene(props) {
  return (
    <Canvas camera={{ position: [5, 3, -3], fov: 50 }}>
      <CanvasContent {...props} />
    </Canvas>
  );
}