import { useState, createContext } from 'react';
import Searchbar from './components/searchbar';
import ItemList from './components/itemlist';
import './App.css';

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

  const list = { itemList, setItemList, updateItemInList, getItemInList };

  return (
    <div className='flex gap m-5'>
      <ItemListContext.Provider value={list}>
        <Searchbar />
        <ItemList />
      </ItemListContext.Provider>
    </div>
  );
}

export default App;
