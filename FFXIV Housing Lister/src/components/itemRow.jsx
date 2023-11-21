import { useContext, useEffect, useState } from "react";
import { ItemListContext } from '../App';

function ItemRow({ item }) {
  const [tempQuantity, setTempQuantity] = useState(item.quantity);
  const [calculatedMarketPrice, setCalculatedMarketPrice] = useState(0);
  const [unitsForSale, setUnitsForSale] = useState(999);

  const { updateItemValue, setShowModal, setModalContent } = useContext(ItemListContext);

  // Synchronise item quantity
  useEffect(() => {
    setTempQuantity(item.quantity);
  }, [item.quantity]);

  // Synchronise total market board prices
  useEffect(() => {
    if (item.marketBoardPrice)
      setCalculatedMarketPrice(calculateMarketBoardPrice());
  }, [item.quantity, item.marketBoardPrice]);

  // Synchronise max units available
  useEffect(() => {
    if (item.marketBoardPrice)
      setUnitsForSale(item.marketBoardPrice.unitsForSale);
  }, [item.marketBoardPrice]);

  const validateAndSetQuantity = (value) => {
    value = (value < 1) ? 1 : (value > unitsForSale) ? unitsForSale : Number(value);
    setTempQuantity(value);
    updateItemValue(item.id, { quantity: value });
  };

  const calculateMarketBoardPrice = () => {
    if (item.marketBoardPrice == "N/A")
      return "N/A";

    return item.marketBoardPrice.listings
      .slice(0, item.quantity)
      .reduce((total, listing) => total + listing.pricePerUnit, 0);
  };

  const handleCheckbox = (checked) => {
    updateItemValue(item.id, { isChecked: checked });
  };

  const marketBoardContent = () => {
    const slicedListings = item.marketBoardPrice.listings.slice(0, item.quantity);
    return (
      <table className='w-full'>
        <thead>
          <tr>
            <th>Gil</th>
            <th>World</th>
            <th>Retainer</th>
          </tr>
        </thead>
        <tbody>
          {slicedListings.map((unit) =>
            <tr key={unit.listingID}>
              <td>
                {unit.pricePerUnit}
              </td>
              <td>
                {unit.worldName}
              </td>
              <td>
                {unit.retainerName}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <tr key={item.id} className={item.isChecked ? "checked" : ""}>
      <td className="pad-small">
        <div className="flex gap align-center">
          <input type="checkbox" checked={item.isChecked}
            onChange={e => handleCheckbox(e.target.checked)}>
          </input>
          {item.name}
        </div>
      </td>
      <td className="pad-small">
        <input className="pad-small" type="number" min="1" max={unitsForSale} value={tempQuantity}
          onChange={e => setTempQuantity(e.target.value)}
          onBlur={() => validateAndSetQuantity(tempQuantity)}>
        </input>
      </td>
      <td className="pad-small">
        <div className="flex align-center">
          {item.gilShopPrice ?
            <>
              {item.gilShopPrice * item.quantity}
              <img className="icon" src="../../gilShopIcon.webp"></img>
            </> :
            item.marketBoardPrice ?
              <>
                {unitsForSale == 0 ?
                  <span className="text-small">Out of stock</span>
                  :
                  calculatedMarketPrice == "N/A" ?
                    calculatedMarketPrice
                    :
                    <button className="icon-btn market-price-btn pad-0" onClick={() => { setShowModal(true); setModalContent(marketBoardContent()); }}>{calculatedMarketPrice}</button>
                }
                <img className="icon" src="../../marketBoardIcon.webp"></img>
              </> : <></>
          }
        </div>
      </td>
      <td className="pad-small">{item.materials}</td>
    </tr>
  );
}

export default ItemRow;