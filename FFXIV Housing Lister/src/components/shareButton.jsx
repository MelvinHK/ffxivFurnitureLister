import { useContext } from "react";
import { ItemListContext } from "../App";

function ShareButton() {
  const { itemList, handleModal } = useContext(ItemListContext);

  const generateLink = () => {
    if (itemList.content.length == 0) throw "Error: List is empty; nothing to share.";

    const items = {};
    itemList.content.map(item => items[item.id] = item.quantity);

    console.log(JSON.stringify(items));
    const encodedList = btoa((JSON.stringify(items)));
    const baseURL = window.location;
    const link = `${baseURL}/${encodedList}`;

    if (link.length > 2048) throw "Error: List is too large to turn into a shareable link, sorry...";

    return link;
  };

  const handleShareModal = () => {
    try {
      var link = generateLink();
    } catch (error) {
      return alert(error);
    }

    handleModal(
      <>
        <h4>Share</h4>
        <div className="sharelink-container">
          {link}
        </div>
      </>
    );
  };

  return (
    <button onClick={() => handleShareModal()} title="Share list" className="icon-btn flex align-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
      </svg>
    </button>
  );
}

export default ShareButton;