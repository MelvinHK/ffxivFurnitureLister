import { useState } from "react";

function ItemRow({ item }) {
    const [values, setValues] = useState({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        gil: item.gil,
        materials: item.materials
    });

    return (
        <tr key={values.id}>
            <td className="pad">{values.name}</td>
            <td className="pad">{values.quantity}</td>
            <td className="pad">{values.gil}</td>
            <td className="pad">{values.materials}</td>
        </tr>
    );
}

export default ItemRow;