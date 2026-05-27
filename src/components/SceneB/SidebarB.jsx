import { useState } from "react";
import Modal from"../Modal";

export default function Sidebar({ value, onChange, onReset }) {

  const [activeModal, setActiveModal] = useState(null);
  
  return (
    <div className="sidebar">
      <button onClick={() => setActiveModal("modal1")}>
        Teorija
      </button>
      <button onClick={() => setActiveModal("modal2")}>
        Apie vizualizaciją
      </button>

      <div>
        <div className="slider-label">Kolbos pozicija</div>
        <input className="slider"
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
      <button className="reload-model"
        onClick={onReset}
      >
        Perkrauti modelį
      </button>
      <Modal
        isOpen={activeModal === "modal1"}
        onClose={() => setActiveModal(null)}
      >
        <p>
          Šilumos laidumas yra savaiminis šilumos sklidimas iš vienos medžiagos į kitą, joms liečiantis, arba iš tos pačios medžiagos vienos dalies į kitą, kai šilumos perdavimas nevyksta konvekcijos būdu.
        </p>
        <p style={{fontSize: 11}}>Algirdas Deveikis „Fizika“. Vadovėlis 9 (I gimnazijos) klasei, I dalis, 30 psl.</p>
      </Modal>
      <Modal
        isOpen={activeModal === "modal2"}
        onClose={() => setActiveModal(null)}
      >
        <p style={{marginBottom: 0}}>
          Į mėgintuvėlį, pripildytą vandens, yra įdėtas ledo kubelis, kuris prispaustas svareliu prie dugno.
        </p>
        <p style={{marginTop: 0, marginBottom: 0}}>
          Judinant mėgintuvėlį galima stebėti, kada tirpsta ledo kubelis</p>
        <p>
          Kadangi vanduo yra prastas šilumos laidinkas, mėgintuvėlio dugno tiesiogai nešildant su degikliu, ledo kubelis netirpsta.
        </p>
      </Modal>
    </div>
  );
}