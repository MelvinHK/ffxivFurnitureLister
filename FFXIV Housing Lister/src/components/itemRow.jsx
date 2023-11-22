import { useContext, useEffect, useState } from "react";
import { ItemListContext } from '../App';

function ItemRow({ item }) {
  const [tempQuantity, setTempQuantity] = useState(item.quantity);
  const [calculatedMarketPrice, setCalculatedMarketPrice] = useState(0);
  const [unitsForSale, setUnitsForSale] = useState(999);
  const [showMaterials, setShowMaterials] = useState(false);

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
        <input className="pad-small" type="number" min="1" max={unitsForSale} value={tempQuantity}
          onChange={e => setTempQuantity(e.target.value)}
          onBlur={() => validateAndSetQuantity(tempQuantity)}>
        </input>
      </td>
      {/* Gil */}
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
                    <button className="icon-btn market-price-btn pad-0" onClick={() => { setShowModal(true); setModalContent(marketBoardContent()); }}>
                      {calculatedMarketPrice}
                    </button>
                }
                <img className="icon" src="../../marketBoardIcon.webp"></img>
              </> : <></>
          }
        </div>
      </td>
      {/* Materials */}
      <td className="pad-small">
        {item.materials == "N/A" ? item.materials :
          showMaterials ?
            <div className="flex gap">
              <div>
                {item.materials.map((material) => {
                  return (<div key={item.id + material.name}>
                    <p className="text-small">
                      {item.quantity * material.amount} {material.name}
                    </p>
                    {material.subMaterials ? material.subMaterials.map((subMaterial) =>
                      <p key={item.id + material.name + subMaterial.name} className="text-small submaterial">
                        {item.quantity * subMaterial.amount} {subMaterial.name}
                      </p>) : <></>
                    }
                  </div>);
                })}
              </div>
              <button onClick={() => setShowMaterials(false)} className="icon-btn text-small ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708" />
                </svg>
              </button>
            </div> :
            <button onClick={() => setShowMaterials(true)} className="icon-btn text-small">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            </button>
        }
      </td>
    </tr>
  );
}

export default ItemRow;