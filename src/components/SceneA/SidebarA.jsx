import { useState } from "react";
import Modal from"../Modal";

const OPTIONS = [
  {id: 1, name:"Silver", value: "Sidabras"},
  {id: 2, name:"Copper", value: "Varis"},
  {id: 3, name:"Aluminium", value: "Aliuminis"},
  {id: 4, name:"Iron", value: "Geležis"},
  {id: 5, name:"Steel", value: "Plienas"},
  {id: 6, name:"Titanium", value: "Titanas"},
];

export default function Sidebar({
  leftSelection,
  rightSelection,
  setLeftSelection,
  setRightSelection,
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

      <div>
        <label style={{color:"#0084ff"}}>Kairysis modelis</label>

        <select className="dropdown-select"
          value={leftSelection}
          onChange={(e) => setLeftSelection(e.target.value)}
        >
          {OPTIONS.map((option) => (
            <option key={option.name} value={option.name}>
              {option.value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{color:"#ff3300"}}>Dešinysis modelis</label>

        <select className="dropdown-select"
          value={rightSelection}
          onChange={(e) => setRightSelection(e.target.value)}
        >
          {OPTIONS.map((option) => (
            <option key={option.name} value={option.name}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
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
          Prie stove įtvirtinto strypo yra vašku prilipdytos vinutės.
        </p>
        <p style={{marginTop: 0, marginBottom: 0}}>
          Laisvasis strypo galas yra kaitinamas.</p>
        <p style={{marginTop: 0, marginBottom: 0}}>
          Degiklio šildomas strypas įkaista ir vaškas laikantis vinutes ištirpsta.
        </p>
        <p>Keiskite įtvirtintų strypų metalų tipą ir stebėkite jų šilumos laidumo skirtumą.</p>
      </Modal>
    </div>
  );
}