import { useState, createContext } from 'react';
import Searchbar from './components/searchbar';
import ItemList from './components/itemlist';
import './App.css';

export const ItemListContext = createContext();

function App() {
  const [itemList, setItemList] = useState([]);
  const list = { itemList, setItemList };

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
