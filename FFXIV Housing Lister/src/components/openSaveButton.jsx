import { useContext, useState } from "react";
import { ItemListContext } from "../App";

function SavesList({ option }) {
  const [saveName, setSaveName] = useState("");

  const { itemList, setItemList, updateItemListKey, setShowModal } = useContext(ItemListContext);

  const getSaves = () => {
    const keys = Object.keys(localStorage);
    const items = {};

    keys.forEach(key => {
      items[key] = localStorage.getItem(key);
    });

    return items;
  };

  const handleSave = () => {
    if (itemList.content.length == 0)
      return alert("Error: There are no items in your list to save.");

    updateItemListKey(saveName);
    localStorage.setItem(saveName, JSON.stringify(itemList));
    setSavesList(getSaves());
  };

  const [savesList, setSavesList] = useState(getSaves());

  const handleClick = (key) => {
    if (option == "Save" && confirm(`Overwrite save file, "${key}"?`)) {
      if (itemList.content.length == 0)
        return alert("Error: There are no items in your list to save.");

      if (saveName) {
        localStorage.removeItem(key);
        localStorage.setItem(saveName, JSON.stringify(itemList));
        updateItemListKey(saveName);
      } else {
        localStorage.setItem(key, JSON.stringify(itemList));
      }
      setSavesList(getSaves());
    }

    if (option == "Open") {
      setItemList(JSON.parse(savesList[key]));
      updateItemListKey(key);
    }
    setShowModal(false);
  };

  const handleRemove = (key) => {
    if (!confirm(`Remove save file, "${key}?"`)) return;
    localStorage.removeItem(key);
    setSavesList(getSaves());
    updateItemListKey(null);
  };

  return (<>
    <h4>{option}</h4>
    {option == "Save" ?
      <form className="flex m-top">
        <input className="flex-1" placeholder="New Save Name" value={saveName} onChange={e => setSaveName(e.target.value)}></input>
        <button type="submit" className="flex align-center square-btn" title="Save" onClick={(e) => { e.preventDefault(); handleSave(saveName); }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy" viewBox="0 0 16 16">
            <path d="M11 2H9v3h2z" />
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
          </svg>
        </button>
      </form> : <></>}

    {Object.keys(savesList).length == 0 ?
      <p>Saves list is empty.</p>
      :
      <>
        {option == "Save" ? <p>Click on an existing save to overwrite it.</p> : <></>}
        <div className="grid">
          {Object.keys(savesList).map(key =>
            <div key={key} className="flex align-center relative">
              <button className="text-left w-full" onClick={() => handleClick(key)}>{key}</button>
              <button className="icon-btn remove-btn ml-auto absolute right" onClick={() => handleRemove(key)}>&#x2715;</button>
            </div>
          )}
        </div>
      </>
    }
  </>);
}

function OpenSaveButton() {
  const { handleModal, itemList } = useContext(ItemListContext);

  return (
    <div>
      <h4>Save in Browser</h4>
      <p className="text-small">Open/Save lists you've created.</p>
      <div className="flex w-full">
        <button className="flex-1" onClick={() => handleModal(<SavesList option={"Open"} />)}>Open</button>
        <button className="flex-1" onClick={() => handleModal(<SavesList option={"Save"} />)} > Save</button>
      </div>
      <p className="text-small">Please manually re-save any important changes.</p>
      {itemList.key ? <p className="text-small">Currently open: {itemList.key}</p> : <></>}
    </div >
  );
}

export default OpenSaveButton;