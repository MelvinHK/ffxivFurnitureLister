import { useContext, useState } from "react";
import { ItemListContext } from "../App";
import { fetchItemsByIDs, fetchMaterialsByIDs, getGilShopPrice } from "../functions";

function MakePlace() {
  const [fileStatus, setFileStatus] = useState("");
  const { updateItemListContent } = useContext(ItemListContext);

  const getItemIDs = (file) => {
    const properties = ["exteriorFixture", "exteriorFurniture", "interiorFixture", "interiorFurniture"];

    const ids = properties
      .flatMap(property => file[property]
        .filter(item => item.itemId !== 0)
        .map(item => item.itemId));

    return ids;
  };

  const handleAddItems = async (ids) => {
    const items = await fetchItemsByIDs([...new Set(ids)]);

    const itemQuantities = ids.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    const itemMaterials = await fetchMaterialsByIDs(
      items
        .filter(item => item.Recipes)
        .map(item => item.Recipes[0].ID)
    );

    updateItemListContent(items.map(item => {
      return {
        id: item.ID,
        name: item.Name,
        quantity: itemQuantities[item.ID],
        gilShopPrice: getGilShopPrice(item),
        marketBoardPrice: null,
        materials: itemMaterials[item.ID] ? itemMaterials[item.ID] : "N/A",
        isChecked: false
      };
    }));
  };

  const handleFile = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      try {
        const makePlaceFile = JSON.parse(e.target.result);
        const ids = getItemIDs(makePlaceFile);

        setFileStatus("Loading...");
        await handleAddItems(ids);
        setFileStatus("");

      } catch (error) {
        alert("Error parsing JSON:", error);
      }
    };

    fileReader.readAsText(e.target.files[0], "UTF-8");
  };

  return (
    <div>
      <h4>MakePlace</h4>
      <p className="text-small">Import a .json save file from <a href="https://makeplace.app/" target="_blank">MakePlace</a>.</p>
      <button className={`w-full pad relative ${fileStatus ? `disabled` : ``}`}>
        <input className="makeplace-btn" type="file" accept="application/json" onChange={(e) => handleFile(e)} />
        {fileStatus ? fileStatus : "Choose File"}
      </button>
      <p className="text-small">Find in "MakePlace\Save\".</p>
    </div>
  );
}

export default MakePlace;