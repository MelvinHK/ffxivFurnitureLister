import { useContext, useEffect, useState } from "react";
import { ItemListContext } from '../App';

function ItemRow({ itemProp }) {
  const [item, setItem] = useState();
  const [quantityInput, setQuantityInput] = useState();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState();

  const { updateItemInList } = useContext(ItemListContext);

  useEffect(() => { // Synchronisation that allows item row to be updated from other components
    setItem(itemProp);
    setQuantityInput(itemProp.quantity);
    setIsCheckboxChecked(itemProp.isComplete);
  }, [itemProp]);

  const validateAndSetQuantity = (value) => {
    value = (value < 1) ? 1 : (value > 999) ? 999 : Number(value);
    setQuantityInput(value);
    updateItemInList(item.id, "quantity", value);
  };

  const handleCheckbox = (checked) => {
    setIsCheckboxChecked(checked);
    updateItemInList(item.id, "isComplete", checked);
  };

  return (
    item == null ? <></> :
      <tr key={item.id} className={isCheckboxChecked ? "complete" : ""}>
        <td className="pad">
          <div className="flex gap align-center">
            <input type="checkbox" onChange={e => handleCheckbox(e.target.checked)}></input>
            {item.name}
          </div>
        </td>
        <td className="pad">
          <input type="number" min="1" max="999" value={quantityInput}
            onChange={e => setQuantityInput(e.target.value)}
            onBlur={() => validateAndSetQuantity(quantityInput)}></input>
        </td>
        <td className="pad">{item.gil}</td>
        <td className="pad">{item.materials}</td>
      </tr>
  );
}

export default ItemRow;