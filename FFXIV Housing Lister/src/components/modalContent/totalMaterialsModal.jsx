import { useState, useRef } from "react";
import { useClickAway } from "../../functions";

export const TotalMaterialsModal = ({ itemList }) => {
  const [hideGilShopItems, setHideGilShopItems] = useState(true);
  const [hideCheckedItems, setHideCheckedItems] = useState(true);

  const [filterText, setFilterText] = useState("");
  const [specifiedItems, setSpecifiedItems] = useState(new Set());
  const [hideResults, setHideResults] = useState(true);

  const searchContainer = useRef(null);
  useClickAway(searchContainer, setHideResults);

  const totalMaterials = itemList.content.reduce((acc, item) => {
    if (
      (item.materials !== "N/A" && item.materials !== null) &&
      (!hideGilShopItems || !item.gilShopPrice) &&
      (!hideCheckedItems || !item.isChecked) &&
      (specifiedItems.size === 0 || specifiedItems.has(item.name))
    )
      item.materials.forEach(({ name, amount }) => {
        acc[name] = (acc[name] || 0) + amount * item.quantity;
      });
    return acc;
  }, {});

  const materialsList = Object.entries(totalMaterials)
    .map(([materialName, quantity]) => ({ materialName, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .map(({ materialName, quantity }) => (
      <li className="text-small" key={materialName}>
        {quantity} {materialName}
      </li>
    ));

  const handleSpecifyItem = (itemName) => {
    setHideResults(true);
    setSpecifiedItems(new Set([itemName, ...specifiedItems]));
  };

  const filteredResults = itemList.content
    .filter(item => item.materials !== "N/A" && item.materials !== null && item.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
    .slice(0, 10);

  const searchResultsDisplay = filteredResults.map((item) => (
    <button key={item.id} onClick={() => handleSpecifyItem(item.name)} className='pad-small text-small text-left w-full flex'>
      <span>{item.name}</span>
      {specifiedItems.has(item.name) &&
        <span className='ml-auto text-small'>(added)</span>
      }
    </button>
  ));

  const specifiedItemsDisplay = Array.from(specifiedItems).map(itemName =>
    <div key={itemName} className="save-file-wrapper flex align-center relative">
      <div className="text-left text-small w-full save-file-text pad-small black">{itemName}</div>
      <button className="icon-btn remove-btn ml-auto absolute right"
        onClick={() => setSpecifiedItems(new Set([...specifiedItems].filter(itemToRemove => itemToRemove !== itemName)))}
      >
        &#x2715;
      </button>
    </div>
  );

  return (<div id="total-materials-modal">
    <h4>Total Materials</h4>
    <div className="flex-col gap">
      <div ref={searchContainer} className="relative flex-1 w-half z-2">
        <input
          type="text"
          className="pad-small text-small w-full border-box"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          placeholder="Specify items..."
        ></input>
        {!hideResults &&
          <div className='flex-col absolute w-full'>
            {searchResultsDisplay}
          </div>
        }
      </div>
      {specifiedItems.size > 0 &&
        <div className="grid mt-0">
          {specifiedItemsDisplay}
        </div>
      }
      <div className="flex align-center">
        <input type="checkbox" className="checkbox-small" checked={hideGilShopItems} onChange={e => setHideGilShopItems(e.target.checked)}></input>
        <label className="text-small">&nbsp;Ignore items bought from NPCs</label>
      </div>
      <div className="flex align-center">
        <input type="checkbox" className="checkbox-small" checked={hideCheckedItems} onChange={e => setHideCheckedItems(e.target.checked)}></input>
        <label className="text-small">&nbsp;Ignore checked off items</label>
      </div>
    </div >
    {
      materialsList.length > 0 ? (<>
        <ul className="column-container pt-0 list-no-bullets">
          {materialsList}
        </ul>
      </>) : <p>N/A</p>
    }
  </div>);
};