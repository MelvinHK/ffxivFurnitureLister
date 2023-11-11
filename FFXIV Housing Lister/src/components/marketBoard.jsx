import { useState } from "react";

function MarketBoard() {
  const [selected, setSelected] = useState();

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

  return (
    <div>
      <h4>Market Board</h4>
      <form className="flex-col w-full border-box">
        <label>Data Centre / Home World </label>
        <select>
          <option>Select</option>
          <optgroup label="Data Centres">
            {dataCentres.map(name => <option key={name}>{name}</option>)}
          </optgroup>
          <optgroup label="Home Worlds">
            {homeWorlds.map(name => <option key={name}>{name}</option>)}
          </optgroup>
        </select>
      </form>
    </div>
  );
}

export default MarketBoard;