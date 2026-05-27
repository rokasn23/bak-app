import * as THREE from "three";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
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
    onReady,
  },
  ref
) {
  const group = useRef();

  const { scene, animations } = useGLTF(url);

  const clonedScene = useMemo(
    () => scene.clone(true),
    [scene]
  );

  const mixer = useMemo(
    () => new THREE.AnimationMixer(clonedScene),
    [clonedScene]
  );

  const currentActionRef = useRef(null);
  const playingRef = useRef(false);

  const selectedMaterialRef = useRef(selectedMaterial);

useEffect(() => {
  selectedMaterialRef.current = selectedMaterial;
}, [selectedMaterial]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (MATERIAL_NAMES.includes(child.name)) {
        child.visible = false;
      }

      if (child.name === selectedMaterial) {
        child.visible = true;

        child.traverse?.((subChild) => {
          subChild.visible = true;
        });
      }
    });
    onReady?.();
  }, [selectedMaterial, clonedScene, onReady]);

  useEffect(() => {
    const handleFinished = (e) => {
      if (e.action === currentActionRef.current) {
        playingRef.current = false;
        onAnimationFinished?.();
      }
    };

    mixer.addEventListener("finished", handleFinished);

    return () => {
      mixer.removeEventListener(
        "finished",
        handleFinished
      );
    };
  }, [mixer, onAnimationFinished]);

  useImperativeHandle(ref, () => ({
    play() {
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

      currentActionRef.current = action;
      playingRef.current = true;
    },

    reset() {
      mixer.stopAllAction();
      currentActionRef.current = null;
      playingRef.current = false;
    },

    isPlaying() {
      return playingRef.current;
    },
  }));

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  return (
    <primitive
      ref={group}
      object={clonedScene}
      position={position}
    />
  );
});

export default Model;