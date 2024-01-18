import { useState } from "react";

export const TotalMaterialsModal = ({ itemList }) => {
  const [showGilShopItems, setShowGilShopItems] = useState(false);

  const totalMaterials = itemList.content.reduce((acc, item) => {
    if (item.materials !== "N/A" && (showGilShopItems || !item.gilShopPrice))
      item.materials.forEach(({ name, amount }) => {
        acc[name] = (acc[name] || 0) + amount * item.quantity;
      });
    return acc;
  }, {});

  const materialsList = Object.entries(totalMaterials)
    .map(([materialName, quantity]) => ({ materialName, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .map(({ materialName, quantity }) => (
      <li className="text-small" key={materialName}>
        {quantity} {materialName}
      </li>
    ));

  return (<>
    <h4>Total Materials</h4>
    <div className="flex align-center">
      <input type="checkbox" className="checkbox-small" checked={showGilShopItems} onChange={e => setShowGilShopItems(e.target.checked)}></input>
      <label className="text-small">Include items from NPC gil exchange</label>
    </div>
    {materialsList.length > 0 ? (<>
      <ul className="column-container pt-0 list-no-bullets">
        {materialsList}
      </ul>
    </>) : <p>N/A</p>}
  </>);
};