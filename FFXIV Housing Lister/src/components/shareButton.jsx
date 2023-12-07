import { useContext } from "react";
import { ItemListContext } from "../App";
import { encode } from 'base2048';

function ShareButton() {
  const { itemList, handleModal } = useContext(ItemListContext);

  const generateLink = () => {
    if (itemList.content.length == 0) throw "Error: List is empty; nothing to share.";

    const items = {};
    itemList.content.map(item =>
      items[item.id] = Number(item.quantity + `${item.isChecked ? "1" : "0"}`)
    );

    const encodedItems = encode(pako.deflate(JSON.stringify(items)));
    const baseURL = window.location;

    const link = `${baseURL}/${encodedItems}`;

    if (link.length > 2048) throw "Error: List is too large to turn into a shareable link, sorry...";

    return link;
  };

  const handleShareModal = () => {
    try {
      var link = generateLink();
    } catch (error) {
      return alert(error);
    }

    const copyToClipboard = () => navigator.clipboard.writeText(link);

    handleModal(<>
      <h4>Share List</h4>
      <p>Shares current state of list.</p>
      <div className="sharelink-container">
        <button title="Copy to clipboard" onClick={() => copyToClipboard()} className="flex align-center ml-btn icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
          </svg>
        </button>
        <div className="sharelink pad">
          {link}
        </div>
      </div>
    </>);
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