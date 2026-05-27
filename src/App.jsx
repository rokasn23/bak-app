import { useState } from "react";

import Header from "./components/Header";
import Modal from "./components/Modal";

import SceneA from "./components/SceneA/SceneA";
import SceneB from "./components/SceneB/SceneB";
import SceneC from "./components/SceneC/SceneC";

// workspace === model  because modal and model triggers dyslexia
const workspaces = [
  {
    id: "workspace-a",
    name: "Šilumos sklidimas metalu",
    scene: <SceneA />,
  },
  {
    id: "workspace-b",
    name: "Vandens šilumos laidumas",
    scene: <SceneB />,
  },
  {
    id: "workspace-c",
    name: "Kūno šiluminės spinduliuotės sugerties sparta",
    scene: <SceneC />,
  },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [currentWorkspace, setCurrentWorkspace] =
    useState("workspace-a");

  const activeWorkspace = workspaces.find(
    (w) => w.id === currentWorkspace
  );

  return (
    <div className="app">
      <Header
        onOpenModal={() => setIsModalOpen(true)}
        currentWorkspace={currentWorkspace}
        workspaces={workspaces}
        onWorkspaceChange={setCurrentWorkspace}
      />

      <div className="content">
        <main className="scene-container">
          {activeWorkspace.scene}
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2>Informacija apie svetainę</h2>

        <p>
          Sukūrė Rokas Naujokaitis
        </p>
        <p>
          Vytauto Didžiojo universiteto, informatikos sistemų studijų 4 kurso studentas.
        </p>
        <p>&nbsp;</p>
        <p>Fizikos reišikinių 3D modeliai buvo sukurti bakalauriniam darbui.</p>
        <p>Baigiamojo darbo vadovas – doc. dr. Algirdas Deveikis.</p>
        <p>&nbsp;</p>
        <p>3D modeliai buvo sukurti naudojant „Blender“ programą.</p>
      </Modal>
    </div>
  );
}