import { useContext, useEffect, useState } from "react";
import { ItemListContext } from '../App';

function ItemRow({ itemProp }) {
  const [item, setItem] = useState();
  const [quantityInput, setQuantityInput] = useState();

  const { updateItemInList } = useContext(ItemListContext);

  useEffect(() => { // Synchronisation allows items to be updated from other components
    setItem(itemProp);
    setQuantityInput(itemProp.quantity);
  }, [itemProp]);

  const validateAndSetQuantity = (value) => {
    value = (value < 1) ? 1 : (value > 999) ? 999 : Number(value);
    setQuantityInput(value);
    updateItemInList(item.id, "quantity", value);
  };

  return (
    item == null ? <></> :
      <tr key={item.id}>
        <td className="pad">{item.name}</td>
        <td className="pad flex">
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