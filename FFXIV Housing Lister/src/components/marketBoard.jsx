import { useContext, useState } from "react";
import { ItemListContext } from "../App";
import { fetchMarketBoardPrices } from "../functions";

function MarketBoard() {
  const [location, setLocation] = useState("Select");

  const { itemList, updateItemInList } = useContext(ItemListContext);

  const dataCentres = [
    "Aether",
    "Chaos",
    "Crystal",
    "Dynamis",
    "Elemental",
    "Gaia",
    "Light",
    "Mana",
    "Meteor",
    "Materia",
    "Primal"
  ];

  const homeWorlds = [
    'Adamantoise',
    'Aegis',
    'Alexander',
    'Alpha',
    'Anima',
    'Asura',
    'Atomos',
    'Bahamut',
    'Balmung',
    'Behemoth',
    'Belias',
    'Bismarck',
    'Brynhildr',
    'Cactuar',
    'Carbuncle',
    'Cerberus',
    'Chocobo',
    'Coeurl',
    'Diabolos',
    'Durandal',
    'Excalibur',
    'Exodus',
    'Faerie',
    'Famfrit',
    'Fenrir',
    'Garuda',
    'Gilgamesh',
    'Goblin',
    'Gungnir',
    'Hades',
    'Halicarnassus',
    'Hyperion',
    'Ifrit',
    'Ixion',
    'Jenova',
    'Kujata',
    'Lamia',
    'Leviathan',
    'Lich',
    'Louisoix',
    'Maduin',
    'Malboro',
    'Mandragora',
    'Marilith',
    'Masamune',
    'Mateus',
    'Midgardsormr',
    'Moogle',
    'Odin',
    'Omega',
    'Pandaemonium',
    'Phantom',
    'Phoenix',
    'Ragnarok',
    'Raiden',
    'Ramuh',
    'Ravana',
    'Ridill',
    'Sagittarius',
    'Sargatanas',
    'Sephirot',
    'Seraph',
    'Shinryu',
    'Shiva',
    'Siren',
    'Sophia',
    'Spriggan',
    'Tiamat',
    'Titan',
    'Tonberry',
    'Twintania',
    'Typhon',
    'Ultima',
    'Ultros',
    'Unicorn',
    'Valefor',
    'Yojimbo',
    'Zalera',
    'Zeromus',
    'Zodiark',
    'Zurvan'
  ];

  const handleFetch = async () => {
    const fetchedListings = await fetchMarketBoardPrices(itemList.map(item => item.id), location);
    if (itemList.length == 1)
      updateItemInList(fetchedListings.itemID, "marketBoardPrice", fetchedListings);
    else {
      const keys = Object.keys(fetchedListings);
      keys.forEach(key => {
        updateItemInList(Number(key), "marketBoardPrice", fetchedListings[key]);
      });
    }
  };

  return (
    <div>
      <h4>Market Board Prices</h4>
      <form className="flex-col w-full border-box">
        <label>Data Centre / Home World </label>
        <select value={location} onChange={e => setLocation(e.target.value)}>
          <option>Select</option>
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