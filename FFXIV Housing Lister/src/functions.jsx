import { useEffect } from "react";

export const useOutsideIsClicked = (ref, isOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => isOutside(ref.current && !ref.current.contains(event.target));
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [ref]);
};

export const fetchItemsByName = async (name) => {
  try {
    const response = await fetch(`https://xivapi.com/search?string=*${name}*&filters=ItemSortCategory.ID=50&limit=10&columns=ID,Name,GameContentLinks,PriceMid,Recipes`);
    if (!response.ok) throw new Error(response.status);

    const items = await response.json();
    return items.Results;

  } catch (error) {
    alert(`Error: Unable to search items; something went wrong with the server request.`);
  }
};

export const fetchItemsByIDs = async (ids) => {
  try {
    const response = await fetch(`https://xivapi.com/item?ids=${String(ids)}&filters=ItemSortCategory.ID=50&columns=ID,Name,GameContentLinks,PriceMid,Recipes`);
    if (!response.ok) throw new Error(response.status);

    const items = await response.json();
    return items.Results;

  } catch (error) {
    alert(`Error: Unable to search items; something went wrong with the server request.`);
  }
};

export const getGilShopPrice = (item) => {
  return item.GameContentLinks.hasOwnProperty("GilShopItem") ? item.PriceMid : null;
};

const getMaterialsFromRecipe = (recipe) => {
  const materials = [];

  for (let i = 0; i < 8; i++) {
    const ingredient = recipe[`ItemIngredient${i}`];

    if (!ingredient) continue;

    const material = {
      name: ingredient.Name,
      amount: recipe[`AmountIngredient${i}`],
      subMaterials: []
    };

    const ingredientRecipe = recipe[`ItemIngredientRecipe${i}`];

    if (ingredientRecipe) {
      for (let k = 0; k < 8; k++) {
        const subIngredient = ingredientRecipe[0][`ItemIngredient${k}`];

        if (subIngredient) {
          material.subMaterials.push({
            name: subIngredient.Name,
            amount: ingredientRecipe[0][`AmountIngredient${k}`] * material.amount
          });
        }
      }
    }
    materials.push(material);
  }

  return materials;
};

export const fetchMaterials = async (item) => {
  try {
    if (!item.Recipes) return "N/A";

    const response = await fetch(`https://xivapi.com/recipe/${item.Recipes[0].ID}`);
    if (!response.ok) throw new Error(response.status);

    const recipe = await response.json();
    return getMaterialsFromRecipe(recipe);

  } catch (error) {
    alert(`Error: Unable to fetch materials; something went wrong with the server request.`);
    return "N/A";
  }
};

export const fetchMaterialsByIDs = async (ids) => {
  try {
    const response = await fetch(`https://xivapi.com/recipe?ids=${String(ids)}&columns=*`);
    if (!response.ok) throw new Error(response.status);

    const data = await response.json();

    const materials = {};

    data.Results.forEach(recipe => {
      materials[recipe.ItemResultTargetID] = getMaterialsFromRecipe(recipe);
    });

    return materials;

  } catch (error) {
    alert(`Error: Unable to fetch materials; something went wrong with the server request.`);
    return [];
  }
};

export const fetchMarketBoardPrices = async (ids, location) => {
  try {
    const response = await fetch(`https://universalis.app/api/v2/${location}${String(ids)}`);
    if (!response.ok) throw new Error(response.status);

    const listings = await response.json();
    return ids.length > 1 ? listings.items : { [String(ids)]: listings };

  } catch (error) {
    if (error.message == "500") {
      alert(`Error 500: Something went wrong on Universalis's end. Try again in a few seconds.`);
    } else {
      alert(`Error: Unable to fetch market board prices; something went wrong with the server request.`);
    }
  }
};