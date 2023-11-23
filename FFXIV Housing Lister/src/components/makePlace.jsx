import { useContext } from "react";
import { ItemListContext } from "../App";
import { fetchItemsByIDs, fetchMaterialsByIDs, getGilShopPrice } from "../functions";

function MakePlace() {
  const { setItemList } = useContext(ItemListContext);

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

    const duplicateItemIDs = ids.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    const itemList = [];
    const recipeIDs = items
      .filter(item => item.Recipes)
      .map(item => item.Recipes[0].ID);

    const multipleMaterials = await fetchMaterialsByIDs(recipeIDs);

    items.forEach(item => {
      itemList.push({
        id: item.ID,
        name: item.Name,
        quantity: duplicateItemIDs[item.ID],
        gilShopPrice: getGilShopPrice(item),
        marketBoardPrice: null,
        materials: multipleMaterials[item.ID] ? multipleMaterials[item.ID] : "N/A",
        isChecked: false
      });
    });

    setItemList(itemList);
  };

  const handleFile = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      try {
        const makePlaceFile = JSON.parse(e.target.result);
        const ids = getItemIDs(makePlaceFile);
        await handleAddItems(ids);
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
      <button className="w-full pad makeplace-btn-wrapper">
        <input className="makeplace-btn" type="file" accept="application/json" onChange={(e) => handleFile(e)} />Choose File
      </button>
      <p className="text-small">Find in "MakePlace\Save\".</p>
    </div>
  );
}

export default MakePlace;