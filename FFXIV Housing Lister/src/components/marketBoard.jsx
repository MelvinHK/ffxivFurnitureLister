import { useContext, useState } from "react";
import { ItemListContext } from "../App";
import { fetchMarketBoardPrices } from "../functions";
import { dataCentres, homeWorlds } from "../serverNames";

function MarketBoard() {
  const [location, setLocation] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");

  const { itemList, updateAllMarketBoardPrices } = useContext(ItemListContext);

  const handleValidation = () => {
    const errors = [];
    if (itemList.content.length === 0)
      errors.push("- Add at least one item to the list");

    if (!location)
      errors.push("- Select a data centre or home world");

    const errorMessage = errors.join('\n');

    if (errorMessage)
      throw errorMessage;
  };

  const handleFetch = async (e) => {
    e.preventDefault();

    try {
      handleValidation();
    } catch (error) {
      alert(`Error(s):\n${error}`);
      return setFetchStatus("");
    }

    const notGilShopItems = itemList.content.filter(item => !item.gilShopPrice);
    if (notGilShopItems.length == 0) return setFetchStatus("");

    setFetchStatus("Fetching...");

    const fetchedListings = await fetchMarketBoardPrices(notGilShopItems.map(item => item.id), location);
    if (fetchedListings) updateAllMarketBoardPrices(fetchedListings);

    setFetchStatus("Done!");
    setTimeout(() => setFetchStatus(""), 1000);
  };

  return (
    <div>
      <h4>Market Board</h4>
      <p className="text-small">
        Fetches market board prices via <a href="https://universalis.app/" target="_blank">Universalis</a>.
      </p>
      <form className={`flex-col relative w-full border-box ${fetchStatus ? `disabled` : ``}`}>
        <select className={`${!location ? `default-option` : ``}`} defaultValue="default" onChange={e => setLocation(e.target.value)}>
          <option value="default" disabled>Data Centre / Home World</option>
          <optgroup label="Data Centres">
            {dataCentres.map(name => <option key={name}>{name}</option>)}
          </optgroup>
          <optgroup label="Home Worlds">
            {homeWorlds.map(name => <option key={name}>{name}</option>)}
          </optgroup>
        </select>
        <button className="pad w-full" onClick={(e) => handleFetch(e)}>Fetch</button>
        {fetchStatus && <div className="status-overlay">{fetchStatus}</div>}
      </form>
      <p className="text-small">Periodically re-fetch to have up-to-date prices.</p>
    </div >
  );
}

export default MarketBoard;