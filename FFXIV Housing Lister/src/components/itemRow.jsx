import { useContext, useState } from "react";
import { updateItemInList } from "../functions";
import { ItemListContext } from '../App';

function ItemRow({ item }) {
    const [values, setValues] = useState({ ...item });
    const [tempQuantity, setTempQuantity] = useState(1);

    const { itemList, setItemList } = useContext(ItemListContext);

    const validateAndSetQuantity = (value) => {
        value = (value < 1) ? 1 : (value > 999) ? 999 : value;
        setValues({ ...values, quantity: value });
        setTempQuantity(value);
        updateItemInList(itemList, setItemList, values.id, "quantity", value);
        console.log(itemList);
    };

    return (
        <tr key={values.id}>
            <td className="pad">{values.name}</td>
            <td className="pad flex">
                <input type="number" min="1" max="999" value={tempQuantity}
                    onChange={e => setTempQuantity(e.target.value)}
                    onBlur={() => validateAndSetQuantity(tempQuantity)}></input>
            </td>
            <td className="pad">{values.gil}</td>
            <td className="pad">{values.materials}</td>
        </tr>
    );
}

export default ItemRow;