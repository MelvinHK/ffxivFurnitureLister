import { useContext, useEffect, useState } from "react";
import ItemRow from "./itemRow";
import { ItemListContext } from '../App';
import SortButton from "./sortButton";
import RemoveButton from "./removeButton";
import AboutButton from "./aboutButton";
import Filterbar from "./filterbar";
import MobileMenuButton from "./mobileMenuButton";

function ItemList() {
  const { itemList, handleModal } = useContext(ItemListContext);

  const [filterText, setFilterText] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalGil, setTotalGil] = useState(0);
  const [totalMaterials, setTotalMaterials] = useState({});

  useEffect(() => {
    calculateTotalQuantity();
    calculateTotalGil();
    calculateTotalMaterials();
  }, [itemList.content]);

  const calculateTotalQuantity = () => {
    const sum = itemList.content.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(sum);
  };

  const calculateTotalGil = () => {
    const sum = itemList.content.reduce((acc, item) => {
      if (item.gilShopPrice)
        return acc + item.gilShopPrice * item.quantity;
      else if (!item.marketBoardPrice || item.marketBoardPrice === "N/A")
        return acc + 0;
      else
        return acc + item.marketBoardPrice.listings
          .slice(0, item.quantity)
          .reduce((total, listing) => total + listing.pricePerUnit, 0);
    }, 0);
    setTotalGil(sum);
  };

  const calculateTotalMaterials = () => {
    const sum = itemList.content.reduce((acc, item) => {
      if (item.materials !== "N/A")
        item.materials.forEach(({ name, amount }) => {
          acc[name] = (acc[name] || 0) + amount * item.quantity;
        });
      return acc;
    }, {});
    setTotalMaterials(sum);
  };

  const quantityInfoModalContent = () => {
    return (<>
      <h4>Quantity Disclaimer</h4>
      <p>Quantities for market board items may be adjusted/capped to reflect available stock.</p>
    </>);
  };

  const gilInfoModalContent = () => {
    return (<>
      <h4>Gil Column Info</h4>
      <p className="flex align-center">&#119909;<img className="icon" src="gilShopIcon.webp"></img>&nbsp;= purchased from NPC gil exchange.</p>
      <p className="flex align-center">Empty = not sold by NPC gil exchange; gil price may be fetched from the market board.</p>
      <p className="flex align-center">&#119909;<img className="icon" src="marketBoardIcon.webp"></img>&nbsp;= purchased from the market board.</p>
      <p className="flex align-center">N/A = no available gil source.</p>
    </>);
  };

  const totalMaterialsModalContent = () => {
    const materialsList = Object.entries(totalMaterials)
      .map(([materialName, quantity]) => ({ materialName, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .map(({ materialName, quantity }) => (
        <p className="text-small" key={materialName}>
          {quantity} {materialName}
        </p>
      ));

    return (<>
      <h4>Total Materials</h4>
      {materialsList.length > 0 ? (

        <div className="column-container">
          {materialsList}
        </div>
      ) : <p>N/A</p>}
    </>);
  };

  return (
    <div id="item-list" className='flex-1 flex-col gap'>
      <div id="toolbar" className="flex gap">
        <MobileMenuButton />
        <SortButton />
        <Filterbar filterText={filterText} setFilterText={setFilterText} />
        <RemoveButton />
        <AboutButton />
      </div>
      <div id="item-table-container" className="h-full">
        {itemList.content.length == 0 ?
          <div className="flex-col align-center justify-center w-full h-full">
            <p>No items in list.</p>
            <p>Add items via the menu panel.</p>
          </div>
          :
          <table className='w-full'>
            <colgroup>
              <col id="name-col"></col>
              <col id="quantity-col"></col>
              <col id="gil-col"></col>
              <col id="materials-col"></col>
            </colgroup>
            <tbody>
              {itemList.content.map(item => {
                if (item.name.toLowerCase().indexOf(filterText.toLowerCase()) != -1)
                  return (<ItemRow key={item.id} item={item} />);
              })}
            </tbody>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>
                  <span className="flex align-center">
                    Quantity&nbsp;
                    <button className="flex align-center icon-btn pad-0" onClick={() => handleModal(quantityInfoModalContent())}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                      </svg>
                    </button>
                  </span>
                </th>
                <th>
                  <span className="flex align-center">
                    Gil&nbsp;
                    <button className="flex align-center icon-btn pad-0" onClick={() => handleModal(gilInfoModalContent())}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                      </svg>
                    </button>
                  </span>
                </th>
                <th>Materials</th>
              </tr>
            </thead>
            {itemList.content.length != 0 ?
              <tfoot id="total-footer">
                <tr>
                  <th className="pad-small">Total:</th>
                  <td className="pad-small">{totalQuantity}</td>
                  <td className="pad-small">
                    <span className="flex align-center">
                      {totalGil}<img className="icon" src="gilIcon.webp"></img>
                    </span>
                  </td>
                  <td className="pad-small">
                    <button className="icon-btn pad-sides" title="Total materials" onClick={() => handleModal(totalMaterialsModalContent())}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tfoot> : <></>}
          </table>}
      </div>
    </div>
  );
}

export default ItemList;