import { useState } from 'react';
import Searchbar from './components/searchbar';
import './App.css';

function App() {
  const [itemList, setItemList] = useState([]);

  return (
    <>
      <div className='flex m-5'>
        <Searchbar />
        {/* Item List */}
        <div className='flex-1'>
        </div>
      </div>
    </>
  );
}

export default App;
