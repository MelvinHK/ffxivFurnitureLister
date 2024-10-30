import { useContext, useEffect, useRef, useState } from "react";
import { ItemListContext } from '../App';
import { MarketBoardModal } from "./modalContent/marketBoardModal";

function ItemRow({ item }) {
  const [tempQuantity, setTempQuantity] = useState(item.quantity);
  const [calculatedMarketPrice, setCalculatedMarketPrice] = useState(0);
  const [unitsForSale, setUnitsForSale] = useState(999);
  const [showMaterials, setShowMaterials] = useState(false);

  const { updateItemValue, handleModal } = useContext(ItemListContext);

  const quantityInput = useRef(null);

  // Synchronise item quantity
  useEffect(() => {
    setTempQuantity(item.quantity);
  }, [item.quantity]);

  // Synchronise max units available
  useEffect(() => {
    if (item.marketBoardPrice)
      setUnitsForSale(item.marketBoardPrice.unitsForSale);
  }, [item.marketBoardPrice]);

  // Synchronise total market board prices
  useEffect(() => {
    if (item.marketBoardPrice)
      setCalculatedMarketPrice(calculateMarketBoardPrice());
  }, [item.quantity, item.marketBoardPrice, unitsForSale]);

  const validateAndSetQuantity = (value) => {
    value = Math.min(999, Math.max(1, Number(value)));
    setTempQuantity(value);
    updateItemValue(item.id, { quantity: value });
  };

  const calculateMarketBoardPrice = () => {
    if (item.marketBoardPrice === "N/A") return "N/A";

    var listingsToCount = item.quantity > unitsForSale ? unitsForSale : item.quantity;

    return item.marketBoardPrice.listings
      .slice(0, listingsToCount)
      .reduce((total, listing) => total + listing.pricePerUnit, 0);
  };

  const handleCheckbox = (checked) => {
    updateItemValue(item.id, { isChecked: checked });
  };

  const gilColumnDisplay = () => {
    if (item.gilShopPrice) {
      return <>
        {item.gilShopPrice * item.quantity}
        <img className="icon" src="gilShopIcon.webp"></img>
      </>;
    }
    if (item.marketBoardPrice) {
      return <>
        {unitsForSale === 0 ?
          <span className="text-small">Out of stock</span>
          :
          calculatedMarketPrice === "N/A" ?
            <span className="o-5">{calculatedMarketPrice}</span>
            :
            <button
              className={`link-btn ${item.quantity > unitsForSale ? `market-overflow` : ``}`}
              onClick={() => handleModal(<MarketBoardModal item={item} unitsForSale={unitsForSale} />)}>
              {calculatedMarketPrice}
            </button>
        }
        {calculatedMarketPrice != "N/A" ? <img className="icon" src="marketBoardIcon.webp"></img> : <></>}
      </>;
    }
    return <>
      <span>?</span>
      <img className="icon" src="marketBoardIcon.webp"></img>
    </>;
  };

  return (
    <tr key={item.id} className={item.isChecked ? "checked" : ""}>
      {/* Item Name */}
      <td className="pad-small">
        <div className="flex gap align-center">
          <input type="checkbox" checked={item.isChecked}
            onChange={e => handleCheckbox(e.target.checked)}>
          </input>
          {item.name}
        </div>
      </td>
      {/* Quantity */}
      <td className="pad-small">
        <form onSubmit={(e) => { e.preventDefault(); quantityInput.current.blur(); }}>
          <input ref={quantityInput} className="pad-small" type="number" value={tempQuantity}
            min="1"
            max="999"
            onChange={e => setTempQuantity(e.target.value)}
            onBlur={() => validateAndSetQuantity(tempQuantity)}>
          </input>
        </form>
      </td>
      {/* Gil */}
      <td className="pad-small">
        <div className={`flex align-center`}>
          {gilColumnDisplay()}
        </div>
      </td>
      {/* Materials */}
      <td className="pad-small">
        {item.materials === "N/A" || item.materials === null ?
          <span className="o-5">{item.materials ?? "N/A"}</span>
          :
          showMaterials ?
            <button onClick={() => setShowMaterials(false)} className="icon-btn text-small ml-auto text-left" title="Collapse">
              <div>
                {item.materials.map((material) => {
                  return (
                    <div key={item.id + material.name}>
                      <p className="text-small">
                        {item.quantity * material.amount} {material.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </button>
            :
            <button onClick={() => setShowMaterials(true)} className="link-btn text-small" title="Expand">. . .</button>
        }
      </td>
    </tr >
  );
}

export default ItemRow;