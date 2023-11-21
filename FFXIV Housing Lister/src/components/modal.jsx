import { useContext } from "react";
import { ItemListContext } from "../App";

function Modal({ children }) {
  const { setShowModal } = useContext(ItemListContext);

  return (
    <div className="popup-overlay">
      <div className="popup-window">
        <span className="popup-close-btn" onClick={() => setShowModal(false)}>&#x2715;</span>
        {children}
      </div>
    </div>
  );
}

export default Modal;