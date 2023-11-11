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

  const getItemInList = (id) => {
    return itemList.find(item => item.id === id);
  };

  const itemListContextValues = { itemList, setItemList, updateItemInList, getItemInList };

  return (
    <div className='flex gap m-5'>
      <ItemListContext.Provider value={itemListContextValues}>
        <div className='flex-col'>
          <Searchbar />
          <MarketBoard />
        </div>
        <ItemList />
      </ItemListContext.Provider>
    </div>
  );
}

export default App;
