import { useContext, useEffect, useState } from "react";
import { ItemListContext } from '../App';

function ItemRow({ item }) {
  const [tempQuantity, setTempQuantity] = useState(1);

  useEffect(() => {
    setTempQuantity(item.quantity);
  }, [item.quantity]);

  const { updateItemValue } = useContext(ItemListContext);

  const validateAndSetQuantity = (value) => {
    value = (value < 1) ? 1 : (value > 999) ? 999 : Number(value);
    setTempQuantity(value);
    updateItemValue(item.id, "quantity", value);
  };

  const handleCheckbox = (checked) => {
    updateItemValue(item.id, "isComplete", checked);
  };

  return (
    <tr key={item.id} className={item.isComplete ? "complete" : ""}>
      <td className="pad">
        <div className="flex gap align-center">
          <input type="checkbox" checked={item.isComplete}
            onChange={e => handleCheckbox(e.target.checked)}>
          </input>
          {item.name}
        </div>
      </td>
      <td className="pad">
        <input type="number" min="1" max="999" value={tempQuantity}
          onChange={e => setTempQuantity(e.target.value)}
          onBlur={() => validateAndSetQuantity(tempQuantity)}>
        </input>
      </td>
      <td className="pad">
        <div className="flex align-center">
          {item.gilShopPrice ? <>
            {item.gilShopPrice * item.quantity}
            <img className="icon" src="../../gilShopIcon.webp"></img>
          </> : <></>}
          {item.marketBoardPrice ? <>
            {item.marketBoardPrice * item.quantity}
            <img className="icon" src="../../marketBoardIcon.webp"></img>
          </> : <></>}
        </div>
      </td>
      <td className="pad">{item.materials}</td>
    </tr >
  );
}

export default ItemRow;