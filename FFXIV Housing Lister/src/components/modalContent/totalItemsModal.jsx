import { useState } from "react";

export const TotalItemsModal = ({ itemList, totalQuantity }) => {
  const [showNpcItems, setShowNpcItems] = useState(false);
  const [showMarketBoardItems, setShowMarketBoardItems] = useState(false);
  const [showOutlierItems, setShowOutlierItems] = useState(false);

  const [worldOption, setWorldOption] = useState("");

  const getItemsBy = (condition) => {
    return itemList.content.filter(item => condition(item));
  };

  const npcItems = getItemsBy(item => item.gilShopPrice);
  const marketBoardItems = getItemsBy(item => item.marketBoardPrice && item.marketBoardPrice !== "N/A");
  const outlierItems = getItemsBy(item => !item.gilShopPrice && (!item.marketBoardPrice || item.marketBoardPrice === "N/A"));

  const worlds = Array.from(new Set(
    itemList.content.flatMap(item =>
      (item.marketBoardPrice?.listings || [])
        .slice(0, Math.min(item.quantity, item.marketBoardPrice?.unitsForSale))
        .map(unit => unit.worldName ?? item.marketBoardPrice.worldName)
    )
  ));

  return (<>
    <h4>Total Items</h4>
    <p>{totalQuantity} items total.</p>

    <p className="mb-0">
      {npcItems.reduce((total, item) => total + item.quantity, 0)} purchased from NPC gil exchange.&nbsp;
      <button className="link-btn pad-0" onClick={() => setShowNpcItems(!showNpcItems)}>{showNpcItems ? "Hide" : "View"}</button>
    </p>
    {showNpcItems &&
      <ul className="column-container list-no-bullets mt-0">
        {npcItems.map(item => <li key={item.id} className="text-small">{item.quantity} {item.name}</li>)}
      </ul>
    }

    <p>
      {marketBoardItems.reduce((total, item) => total + item.quantity, 0)} purchased from the market board.&nbsp;
      <button className="link-btn pad-0" onClick={() => setShowMarketBoardItems(!showMarketBoardItems)}>{showMarketBoardItems ? "Hide" : "View"}</button>
    </p>
    {showMarketBoardItems && <div>
      <form style={{ paddingLeft: "40px" }}>
        <select className="pad-small text-small" onChange={e => setWorldOption(e.target.value)}>
          <option>All Worlds</option>
          {worlds.map(world => <option key={world}>{world}</option>)}
        </select>
      </form>

      <ul className="column-container list-no-bullets mt-0">
        {marketBoardItems.map(item => <li key={item.id} className="text-small">{item.quantity} {item.name}</li>)}
      </ul>
    </div>}

    <p>
      {outlierItems.reduce((total, item) => total + item.quantity, 0)} unresolved/non-gil-purchasable.&nbsp;
      <button className="link-btn pad-0" onClick={() => setShowOutlierItems(!showOutlierItems)}>{showOutlierItems ? "Hide" : "View"}</button>
    </p>
    {showOutlierItems &&
      <ul className="column-container list-no-bullets mt-0 pt-0">
        {outlierItems.map(item => <li key={item.id} className="text-small">{item.quantity} {item.name}</li>)}
      </ul>
    }
  </>);
};