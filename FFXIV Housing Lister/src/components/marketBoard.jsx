import { useContext, useState } from "react";
import { ItemListContext } from "../App";
import { fetchMarketBoardPrices } from "../functions";
import { dataCentres, homeWorlds } from "../serverNames";

function MarketBoard() {
  const [location, setLocation] = useState("-");

  const { itemList, updateItemValue, updateAllMarketBoardPrices } = useContext(ItemListContext);

  const handleValidation = () => {
    let errors = "";
    if (itemList.length == 0)
      errors += "- Add at least one item to the list\n";
    if (location == "-")
      errors += "- Select a data centre or home world";
    return errors == "" ? errors : alert("Error(s):\n" + errors);
  };

  const handleFetch = async () => {
    if (handleValidation() != "")
      return;
    
    const notGilShopItems = itemList.filter(item => !item.gilShopPrice);
    if (notGilShopItems.length == 0)
      return;

    const fetchedListings = await fetchMarketBoardPrices(notGilShopItems.map(item => item.id), location);
    updateAllMarketBoardPrices(fetchedListings);
  };

  return (
    <div>
      <h4>Market Board Prices</h4>
      <form className="flex-col w-full border-box">
        <label>Data Centre / Home World </label>
        <select value={location} onChange={e => setLocation(e.target.value)}>
          <option>-</option>
          <optgroup label="Data Centres">
            {dataCentres.map(name => <option key={name}>{name}</option>)}
          </optgroup>
          <optgroup label="Home Worlds">
            {homeWorlds.map(name => <option key={name}>{name}</option>)}
          </optgroup>
        </select>
      </form>
      <button className="pad w-full" onClick={() => { handleFetch(); }}>Fetch</button>
      <p className="text-small">Items purchased from NPC gil merchants <img src="../../gilShopIcon.webp" className="icon-relative"></img> won't have their prices fetched.</p>
    </div >
  );
}

export default MarketBoard;