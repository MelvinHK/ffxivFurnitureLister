import { useState, createContext, useRef, useEffect } from 'react';
import { fetchItemsByIDs, fetchRecipes, fetchGilShopItems, useClickAway, getGilPriceById } from './functions';
import { decode } from 'base2048';
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
  const [hideMobileMenu, setHideMobileMenu] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const mobileMenuContainer = useRef(null);
  useClickAway(mobileMenuContainer, setHideMobileMenu);

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
    hideMobileMenu,
    setHideMobileMenu
  };

  useEffect(() => {
    const handleShareParam = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const shareParam = urlParams.get("share");

      if (!shareParam) return;

      try {
        var decodedItems = JSON.parse(pako.inflate(decode(shareParam), { to: 'string' }));
      } catch (error) {
        return;
      }

      setIsLoading(true);

      const ids = Object.keys(decodedItems);
      const [items, gilShopItems, materials] = await Promise.all([
        fetchItemsByIDs(ids),
        fetchGilShopItems(ids),
        fetchRecipes(ids),
      ]);

      updateItemListContent(items.map(item => {
        const id = item.row_id;
        return {
          id: id,
          name: item.fields.Name,
          quantity: decodedItems[id] / 10 ^ 0,
          gilShopPrice: getGilPriceById(id, gilShopItems),
          marketBoardPrice: null,
          materials: materials[id] ?? null,
          isChecked: decodedItems[id] % 10 == 1 ? true : false
        };
      }));
      setIsLoading(false);
    };
    handleShareParam();
  }, []);

  return (
    <div id="container" className='flex gap m-5 border-box'>

      <ItemListContext.Provider value={itemListContextValues}>
        <div ref={mobileMenuContainer} id="utility-column" className={`flex-col gap ${hideMobileMenu ? `hide-menu` : ``}`}>
          <div className="flex gap">
            <MobileMenuButton />
            <Searchbar />
          </div>
          <MarketBoard />
          <MakePlace />
          <OpenSaveButton />
        </div>
        <ItemList />
        {showModal && <Modal>{modalContent}</Modal>}
      </ItemListContext.Provider>
      {isLoading &&
        <div id="load-shareable-link">
          Loading...
        </div>
      }
    </div>
  );
}

export default App;
