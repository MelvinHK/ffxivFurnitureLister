import { useState, createContext } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import ItemList from './components/itemlist';
import MarketBoard from './components/marketBoard';
import Modal from './components/modal';

export const ItemListContext = createContext();

function App() {
  const [itemList, setItemList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const updateItemValue = (id, updatedProperties) => {
    setItemList(itemList.map(item => {
      return (item.id === id) ? { ...item, ...updatedProperties } : item;
    }));
  };

  const updateAllMarketBoardPrices = (listings) => {
    setItemList(itemList.map(item => {
      if (!listings[item.id] || listings[item.id].itemID == 0)
        return {
          ...item,
          marketBoardPrice: "N/A"
        };
      return {
        ...item,
        marketBoardPrice: listings[item.id],
        quantity: (item.quantity > listings[item.id].unitsForSale) ? listings[item.id].unitsForSale : item.quantity
      };
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
    removeCheckedItems,
    setShowModal,
    setModalContent
  };

  return (
    <div id="container" className='flex gap m-5'>
      <ItemListContext.Provider value={itemListContextValues}>
        <div id="utility-column" className='flex-col gap'>
          <Searchbar />
          <MarketBoard />
        </div>
        <ItemList />
        {showModal ? <Modal>{modalContent}</Modal> : <></>}
      </ItemListContext.Provider>
    </div>
  );
}

export default App;
