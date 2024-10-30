import { useContext, useState } from "react";
import { ItemListContext } from "../App";
import { fetchItemsByIDs, fetchRecipes, fetchGilShopItems, getGilPriceById } from "../functions";

function MakePlace() {
  const [fileStatus, setFileStatus] = useState("");
  const { updateItemListContent } = useContext(ItemListContext);

  const getItemIDs = (file) => {
    const properties = ["exteriorFixture", "exteriorFurniture", "interiorFixture", "interiorFurniture"];

    try {
      const ids = properties
        .flatMap(property => file[property]
          .filter(item => item.itemId !== 0)
          .map(item => item.itemId));

      return ids;

    } catch (error) {
      throw error;
    }
  };

  const handleAddItems = async (ids) => {
    try {
      const setOfIds = [...new Set(ids)]; // Remove duplicate ids, as thats how MakePlace handles the quantity of items

      const itemQuantities = ids.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      const [items, gilShopItems, itemMaterials] = await Promise.all([
        fetchItemsByIDs(setOfIds),
        fetchGilShopItems(setOfIds),
        fetchRecipes(setOfIds),
      ]);

      updateItemListContent(items.map(item => {
        const id = item.row_id;
        return {
          id: id,
          name: item.fields.Name,
          quantity: itemQuantities[id],
          gilShopPrice: getGilPriceById(id, gilShopItems),
          marketBoardPrice: null,
          materials: itemMaterials[id] ?? null,
          isChecked: false
        };
      }));
    } catch (error) {
      throw error;
    }
  };

  const handleFile = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      try {
        const makePlaceFile = JSON.parse(e.target.result);
        const ids = getItemIDs(makePlaceFile);

        setFileStatus("Loading...");
        await handleAddItems(ids);
      } catch (error) {
        console.log(error);
        alert("Error parsing JSON:", error);
      } finally {
        setFileStatus("");
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
        {fileStatus || "Choose File"}
      </button>
    </div>
  );
}

export default MakePlace;