import { useState } from 'react';
import Searchbar from './components/searchbar';
import Itemlist from './components/itemlist';
import './App.css';

function App() {
  const [itemList, setItemList] = useState([]);

  return (
    <div className='flex m-5'>
      <Searchbar />
      <Itemlist />
    </div>
  );
}

export default App;
