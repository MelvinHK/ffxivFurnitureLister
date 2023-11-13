import { useState, createContext } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import ItemList from './components/itemlist';
import MarketBoard from './components/marketBoard';

export const ItemListContext = createContext();

function App() {
  const [itemList, setItemList] = useState([]);

  const updateItemValue = (id, property, newValue) => {
    setItemList(itemList.map(item => {
      return (item.id === id) ? { ...item, [property]: newValue } : item;
    }));
  };

  const updateAllMarketBoardPrices = (listings) => {
    setItemList(itemList.map(item => {
      return (!item.gilShopPrice) ? { ...item, ["marketBoardPrice"]: listings[item.id] } : item;
    }));
  };

  const removeCheckedItems = () => {
    setItemList(itemList.filter(item => !item.isChecked));
  };

  const itemListContextValues = {
    itemList,
    setItemList,
    updateItemValue,
    updateAllMarketBoardPrices,
    removeCheckedItems
  };

  return (
    <div className='flex gap m-5'>
      <ItemListContext.Provider value={itemListContextValues}>
        <div id="utility-column" className='flex-col gap'>
          <Searchbar />
          <MarketBoard />
          <button onClick={() => console.log(itemList)}>log items</button>
        </div>
        <ItemList />
      </ItemListContext.Provider>
    </div>
  );
}

export default App;
