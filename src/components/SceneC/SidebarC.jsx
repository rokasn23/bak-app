import { useState } from "react";
import Modal from"../Modal";

function Slider({ label, min, max, step, value, onChange }) {
  return (
    <div>
      <div className="slider-label">{label}</div>
      <input className="slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="model3-under-slider">{value}</div>
    </div>
  );
}

export default function Sidebar({
  color,
  setColor,
  roughness,
  setRoughness,
  metallic,
  setMetallic,
  ironZ,
  setIronZ,
  onReset,
}) {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="sidebar">
      <button onClick={() => setActiveModal("modal1")}>
        Teorija
      </button>
      <button onClick={() => setActiveModal("modal2")}>
        Apie vizualizaciją
      </button>

      <Slider
        label="Spalva (juoda → balta)"
        min={0}
        max={1}
        step={0.01}
        value={color}
        onChange={setColor}
      />

      <Slider
        label="Šiurkštumas"
        min={0}
        max={1}
        step={0.01}
        value={roughness}
        onChange={setRoughness}
      />

      <Slider
        label="Blizgumas"
        min={0}
        max={1}
        step={0.01}
        value={metallic}
        onChange={setMetallic}
      />
      <Slider
        label="Lygintuvo atstumas"
        min={-2}
        max={0}
        step={0.01}
        value={ironZ}
        onChange={setIronZ}
      />
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
            Šiluminis spinduliavimas yra energijos perdavimas elektromagnetinėmis bangomis.
          </p>
          <p style={{marginBottom: 0}}>
            Kūnai, kurių paviršius yra tamsus, matinis ar širkštus, šiluminę spinduliuotę sugeria geriau negu kūnai, kurių paviršius yra šviesus, blizgus ar glotnus.
          </p>
          <p style={{fontSize: 11}}>Algirdas Deveikis „Fizika“. Vadovėlis 9 (I gimnazijos) klasei, I dalis, 41 psl.</p>
        </Modal>
        <Modal
          isOpen={activeModal === "modal2"}
          onClose={() => setActiveModal(null)}
        >
          <p style={{marginBottom: 0}}>
            Vizualizacijoje yra kaitinamas objektas, kurio spalvos, šiurkštumo ir blizgumo savybes bei lygintuvo atstumą galima keisti.
          </p>

          <p>Keiskite vizualizacijos parametrus ir eksperimentuokite.</p>
        </Modal>
    </div>
  );
}