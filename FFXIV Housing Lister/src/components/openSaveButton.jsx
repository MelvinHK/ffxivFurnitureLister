import { useContext } from "react";
import { ItemListContext } from "../App";
import { SavesModal } from "./modalContent/savesModal";

function OpenSaveButton() {
  const { handleModal, itemList } = useContext(ItemListContext);

  return (
    <div>
      <h4>Save in Browser</h4>
      <p className="text-small">Open/Save lists you've created.</p>
      <div className="flex w-full">
        <button className="flex-1" onClick={() => handleModal(<SavesModal option={"Open"} />)}>Open</button>
        <button className="flex-1" onClick={() => handleModal(<SavesModal option={"Save"} />)} > Save</button>
      </div>
      <p className="text-small">Please re-save any important changes.</p>
      {itemList.key && <p className="text-small">Opened: {itemList.key}</p>}
    </div >
  );
}

export default OpenSaveButton;