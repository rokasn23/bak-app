import * as THREE from "three";
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const MATERIAL_NAMES = [
  "Steel",
  "Aluminium",
  "Copper",
  "Iron",
  "Silver",
  "Titanium",
];

const Model = forwardRef(function Model(
  {
    url,
    selectedMaterial,
    position = [0, 0, 0],
    onAnimationFinished,
    baseColor,
    playTrigger,
  },
) {
  const { scene, animations } = useGLTF(url);

  const clonedScene = useMemo(
    () => scene.clone(true),
    [scene]
  );

  const mixer = useMemo(
    () => new THREE.AnimationMixer(clonedScene),
    [clonedScene]
  );

  //changes model's "base" objects colour to make a better distinction which is which
    const baseObjRef = useRef(null);
    
    useEffect(() => {
      const modelBase = clonedScene.getObjectByName("Base");
  
      if (modelBase) {
        baseObjRef.current = modelBase;
  
        modelBase.material = modelBase.material.clone();
      }
    }, [clonedScene]);
  
    useEffect(() => {
  
      baseObjRef.current.material.color = new THREE.Color(baseColor);
  
      baseObjRef.current.material.needsUpdate = true;
    }, [baseColor, clonedScene]);
    //

  //hides, shows materials
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (MATERIAL_NAMES.includes(child.name)) {
        child.visible = false;
      }

      if (child.name === selectedMaterial) {
        child.visible = true;
      }
    });
  }, [selectedMaterial, clonedScene]);

  useEffect(() => {
    const clip = animations.find(
      (a) => a.name === selectedMaterial
    );

    if (!clip) return;

    mixer.stopAllAction();

    const action = mixer.clipAction(clip);

    action.reset();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();

    
    const handleFinished = (e) => {
      if (e.action === action) {
        onAnimationFinished?.();
      }
    };

    mixer.addEventListener("finished", handleFinished);

    return () => {
      mixer.removeEventListener("finished", handleFinished);
    };

  }, [playTrigger, selectedMaterial, animations, mixer, onAnimationFinished]);

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  return (
    <primitive
      object={clonedScene}
      position={position}
    />
  );
});

export default Model;