import { useState, createContext } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import ItemList from './components/itemlist';
import MarketBoard from './components/marketBoard';

export const ItemListContext = createContext();

function App() {
  const [itemList, setItemList] = useState([]);

  const updateItemValue = (id, updatedProperties) => {
    setItemList(itemList.map(item => {
      return (item.id === id) ? { ...item, ...updatedProperties } : item;
    }));
  };

  const updateAllMarketBoardPrices = (listings) => {
    setItemList(itemList.map(item => {
      if (!item.gilShopPrice && listings[item.id] == listings[item.id].itemID) {
        return {
          ...item,
          marketBoardPrice: listings[item.id],
          quantity: (item.quantity > listings[item.id].unitsForSale) ? listings[item.id].unitsForSale : item.quantity
        };
      } else {
        return {
          ...item,
          marketBoardPrice: "N/A"
        };
      }
    }));
  };

  const removeCheckedItems = () => {
    if (document.getElementsByClassName("checked").length == 0)
      return alert("Error: There are no selected items to remove...");

    if (confirm("Remove selected items?"))
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
