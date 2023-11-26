import { useState, createContext, useEffect } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import ItemList from './components/itemlist';
import MarketBoard from './components/marketBoard';
import Modal from './components/modal';
import MakePlace from './components/makePlace';
import OpenSaveButton from './components/openSaveButton';
import MobileMenuButton from './components/mobileMenuButton';

export const ItemListContext = createContext();

function App() {
  const [itemList, setItemList] = useState({ content: [], key: null });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const updateItemListContent = (newContent) => {
    setItemList(prevState => ({
      ...prevState,
      content: newContent
    }));
  };

  const updateItemListKey = (newKey) => {
    setItemList(prevState => ({
      ...prevState,
      key: newKey
    }));
  };

  const updateItemValue = (id, updatedProperties) => {
    updateItemListContent(
      itemList.content.map(item => {
        return (item.id === id) ? { ...item, ...updatedProperties } : item;
      }));
  };

  const updateAllMarketBoardPrices = (listings) => {
    updateItemListContent(itemList.content.map(item => {
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
    const checkedLength = document.getElementsByClassName("checked").length;
    if (checkedLength == 0)
      return alert("Error: There are no selected items to remove.");

    if (confirm(`Remove ${checkedLength} selected item${checkedLength > 1 ? `s` : ``}?`))
      updateItemListContent(itemList.content.filter(item => !item.isChecked));
  };

  const handleModal = (content) => {
    setShowModal(true);
    setModalContent(content);
  };

  const itemListContextValues = {
    itemList,
    setItemList,
    updateItemListContent,
    updateItemListKey,
    updateItemValue,
    updateAllMarketBoardPrices,
    removeCheckedItems,
    setShowModal,
    handleModal,
    showMobileMenu,
    setShowMobileMenu
  };

  return (
    <div id="container" className='flex gap m-5 border-box'>
      <ItemListContext.Provider value={itemListContextValues}>
        <div id="utility-column" className={`flex-col gap ${showMobileMenu ? `` : `hide-menu`}`}>
          <div className="flex gap">
            <MobileMenuButton />
            <Searchbar />
          </div>
          <MarketBoard />
          <MakePlace />
          <OpenSaveButton />
        </div>
        <ItemList />
        {showModal ? <Modal>{modalContent}</Modal> : <></>}
      </ItemListContext.Provider>
    </div>
  );
}

export default App;
