import { useContext } from "react";
import { ItemListContext } from "../App";

function AboutPopup() {
  const { setShowAbout } = useContext(ItemListContext);

  return (
    <div className="popup-overlay">
      <div className="popup-window">
        <span className="popup-close-btn" onClick={() => setShowAbout(false)}>&#x2715;</span>
        <h4>FFXIV Housing Item Lister</h4>
        <p>A Final Fantasy XIV tool for creating housing-item lists.</p>
        <ul>
          <li>Calculate total gil prices from NPC gil shops and the market board.</li>
          <li>View items' available recipes.</li>
          <li>Save lists in the browser.</li>
          <li>Import housing files from MakePlace.</li>
        </ul>
        <a href="https://github.com/MelvinHK/ffxivHousingLister" target="_blank" className="text-small">GitHub</a>
      </div>
    </div>
  );
}

export default AboutPopup;