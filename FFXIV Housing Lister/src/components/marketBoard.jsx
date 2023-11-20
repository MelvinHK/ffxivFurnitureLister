import { useContext, useState } from "react";
import { ItemListContext } from "../App";
import { fetchMarketBoardPrices } from "../functions";
import { dataCentres, homeWorlds } from "../serverNames";

function MarketBoard() {
  const [location, setLocation] = useState("-");

  const { itemList, updateAllMarketBoardPrices } = useContext(ItemListContext);

  const handleValidation = () => {
    const errors = [];
    if (itemList.length === 0)
      errors.push("- Add at least one item to the list");

    if (location === "-")
      errors.push("- Select a data centre or home world");

    const errorMessage = errors.join('\n');
    return errorMessage === '' ? errorMessage : alert(`Error(s):\n${errorMessage}`);
  };

  const handleFetch = async () => {
    if (handleValidation() != '')
      return;

    const notGilShopItems = itemList.filter(item => !item.gilShopPrice);
    if (notGilShopItems.length == 0)
      return;

    const fetchedListings = await fetchMarketBoardPrices(notGilShopItems.map(item => item.id), location);
    if (fetchedListings)
      updateAllMarketBoardPrices(fetchedListings);
  };

  return (
    <div>
      <h4>Market Board Prices</h4>
      <p className="text-small">Fetches market board prices from <a href="https://universalis.app/" target="_blank">Universalis</a>.</p>
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
      <button className="pad w-full" onClick={() => handleFetch()}>Fetch</button>
      <p className="text-small">Items purchased from NPC gil merchants <img src="../../gilShopIcon.webp" className="icon-relative"></img> won't have their prices fetched.</p>
    </div >
  );
}

export default MarketBoard;