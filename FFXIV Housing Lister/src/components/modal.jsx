import { useContext } from "react";
import { ItemListContext } from "../App";

function Modal({ children }) {
  const { setShowModal } = useContext(ItemListContext);

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        {children}
        <div className="modal-close-btn-wrapper">
          <span className="modal-close-btn" onClick={() => setShowModal(false)}>&#x2715;</span>
        </div>
      </div>
    </div>
  );
}

export default Modal;