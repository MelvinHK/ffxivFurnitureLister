import { useState, createContext } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import ItemList from './components/itemlist';
import MarketBoard from './components/marketBoard';

export const ItemListContext = createContext();

function App() {
  const [itemList, setItemList] = useState([]);

  const updateItemValue = (id, property, newValue) => {
    setItemList(itemList.map(item =>
      (item.id === id) ? { ...item, [property]: newValue } : item
    ));
  };

  const updateAllMarketBoardPrices = (listings) => {
    const itemListClone = structuredClone(itemList);
    itemListClone.forEach(itemClone => {
      if (itemClone.gilShopPrice)
        return;
      itemClone.marketBoardPrice = listings[itemClone.id];
    });
    setItemList(itemListClone);
  };

  const removeItem = (id) => {
    const i = itemList.findIndex(item => item.id == id);
    setItemList(itemList.splice(i, 1));
  };

  const itemListContextValues = {
    itemList,
    setItemList,
    updateItemValue,
    updateAllMarketBoardPrices,
    removeItem
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
