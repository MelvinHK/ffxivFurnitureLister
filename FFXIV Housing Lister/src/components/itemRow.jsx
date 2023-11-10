import { useEffect, useState } from "react";

function ItemRow({ item }) {
    const [values, setValues] = useState({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        gil: item.gil,
        materials: item.materials
    });
    const [tempQuantity, setTempQuantity] = useState(1);

    const validateQuantity = (value) => {
        setValues({ ...values, quantity: (value < 1) ? 1 : (value > 999) ? 999 : value });
        setTempQuantity((value < 1) ? 1 : (value > 999) ? 999 : value);
    };

    return (
        <tr key={values.id}>
            <td className="pad">{values.name}</td>
            <td className="pad flex">
                <input type="number" min="1" max="999" value={tempQuantity}
                    onChange={e => setTempQuantity(e.target.value)}
                    onBlur={() => validateQuantity(tempQuantity)}></input>
            </td>
            <td className="pad">{values.gil}</td>
            <td className="pad">{values.materials}</td>
        </tr>
    );
}

export default ItemRow;