import { useState } from 'react';
import Searchbar from './components/searchbar';
import ItemList from './components/itemlist';
import './App.css';

function App() {
  const [itemList, setItemList] = useState([]);

  return (
    <div className='flex gap m-5'>
      <Searchbar itemList={itemList} setItemList={setItemList} />
      <ItemList itemList={itemList} />
    </div>
  );
}

export default App;
