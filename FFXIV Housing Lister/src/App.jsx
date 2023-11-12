import { useState, createContext } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import ItemList from './components/itemlist';
import MarketBoard from './components/marketBoard';

export const ItemListContext = createContext();

function App() {
  const [itemList, setItemList] = useState([]);

  const updateItemInList = (id, property, newValue) => {
    const i = itemList.findIndex(item => item.id === id);
    const updatedItem = { ...itemList[i], [property]: newValue };
    const newItemList = [...itemList.slice(0, i), updatedItem, ...itemList.slice(i + 1)];
    setItemList(newItemList);
  };

  const itemListContextValues = { itemList, setItemList, updateItemInList };

  return (
    <div className='flex gap m-5'>
      <ItemListContext.Provider value={itemListContextValues}>
        <div id="utility-column" className='flex-col gap'>
          <Searchbar />
          <MarketBoard />
        </div>
        <ItemList />
      </ItemListContext.Provider>
      <button onClick={() => console.log(itemList)}>log items</button>
    </div>
  );
}

export default App;
