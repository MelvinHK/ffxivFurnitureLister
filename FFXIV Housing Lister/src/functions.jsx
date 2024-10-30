import { useEffect } from "react";

export const useClickAway = (ref, isOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) =>
      isOutside(ref.current && !ref.current.contains(event.target));

    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [ref, isOutside]);
};

export const fetchItemsByName = async (name) => {
  try {
    const baseUrl = 'https://beta.xivapi.com/api/1/search';
    const params = new URLSearchParams({
      sheets: 'HousingFurniture',
      query: `Item.Name~"${name}"`,
      fields: 'Item.Name,Item.PriceMid'
    });
    const response = await fetch(`${baseUrl}?${params.toString()}`);
    if (!response.ok) throw new Error(response.status);

    const items = await response.json();
    return items.results;

  } catch (error) {
    console.log(error);
    alert(`Error: Unable to search items; something went wrong with the server request.`);
    return [];
  }
};

/**
 * @param {number[] | string[]} ids
 */
export const fetchItemsByIDs = async (ids) => {
  try {
    const baseUrl = 'https://beta.xivapi.com/api/1/sheet/Item';
    const params = new URLSearchParams({
      rows: ids.join(','),
      fields: 'Name,PriceMid'
    });
    const response = await fetch(`${baseUrl}?${params.toString()}`);
    if (!response.ok) throw new Error(response.status);

    const items = await response.json();
    return items.rows;

  } catch (error) {
    console.log(error);
    alert(`Error: Unable to search items; something went wrong with the server request.`);
    return [];
  }
};

/**
 * Queries items into the GilShopItem sheet, returning the items that are sold in gil shops. 
 * @param {number[] | string[]} ids - An array of item ids to search by.
 */
export const fetchGilShopItems = async (ids) => {
  try {
    const baseUrl = 'https://beta.xivapi.com/api/1/search';
    const fields = 'Item.Name,Item.PriceMid';
    return await fetchWithIdsRecursively(ids, baseUrl, 'GilShopItem', 'Item', fields);

  } catch (error) {
    console.log(error);
    alert(`Error: Unable to check if items are GilShopItems`);
    return [];
  }
};

/**
 * Checks whether an item exists in gilShopItems, returning its gil price if so.
 * @see {@link fetchGilShopItems}
 */
export const getGilPriceById = (targetItemId, gilShopItems) => {
  return gilShopItems
    .find(item => item.fields.Item.row_id === targetItemId)
    ?.fields.Item.fields.PriceMid ?? null;
};

/**
 * @param {number[] | string[]} ids 
 */
export const fetchRecipes = async (ids) => {
  try {
    const baseUrl = 'https://beta.xivapi.com/api/1/search';
    const fields = 'Ingredient[].Name,ItemResult.Name,AmountIngredient';
    const recipes = await fetchWithIdsRecursively(ids, baseUrl, 'Recipe', 'ItemResult', fields);

    return recipes.reduce((acc, { fields: { ItemResult, Ingredient: ingredients, AmountIngredient } }) => {
      acc[ItemResult.row_id] = ingredients.reduce((acc2, ingredient, index) => {
        if (ingredient.row_id > 0) {
          acc2.push({
            id: ingredient.row_id,
            name: ingredient.fields.Name,
            amount: AmountIngredient[index]
          });
        }
        return acc2;
      }, []);
      return acc;
    }, {});

  } catch (error) {
    console.log(error);
    alert(`Error: Unable to fetch materials; something went wrong with the server request.`);
    return {};
  }
};

/**
 * @param {number[]} ids - An array of item IDs.
 * @param {string} location - An existing data centre/world name.
 */
export const fetchMarketBoardPrices = async (ids, location) => {
  try {
    const response = await fetch(`https://universalis.app/api/v2/${location}/${String(ids)}`);
    if (!response.ok) throw new Error(response.status);

    const listings = await response.json();
    return ids.length > 1 ? listings.items : { [String(ids)]: listings };

  } catch (error) {
    console.log(error);
    if (error.message == "500") {
      alert(`Error 500: Something went wrong on Universalis's end. Try again in a few seconds.`);
    } else {
      alert(`Error: Unable to fetch market board prices; something went wrong with the server request.`);
    }
  }
};

/**
 * Recursively splits a URL in halves until they are less than maxUrlLength, then fetches those URLs.
 * @param {number[] | string[]} ids 
 * @param {string} baseUrl - Must be a search query
 * @param {string} sheet 
 * @param {string} specifier 
 * @param {string} fields 
 * @param {number} [maxUrlLength=2000] - Default 2000
 * @see {@link https://beta.xivapi.com/api/1/docs#tag/search/GET/search}
 */
export const fetchWithIdsRecursively = async (ids, baseUrl, sheet, specifier, fields, maxUrlLength = 2000) => {
  try {
    const buildUrl = (idsChunk) => {
      const params = new URLSearchParams({
        sheets: sheet,
        query: `+(${idsChunk.map(id => `${specifier}="${id}"`).join(' ')})`,
        fields: fields
      });
      return `${baseUrl}?${params.toString()}`;
    };

    const url = buildUrl(ids);

    // Split IDs into halves if URL length exceeded.
    if (url.length > maxUrlLength && ids.length > 1) {
      const mid = Math.floor(ids.length / 2);
      const [leftResults, rightResults] = await Promise.all([
        fetchWithIdsRecursively(ids.slice(0, mid), baseUrl, sheet, specifier, fields, maxUrlLength),
        fetchWithIdsRecursively(ids.slice(mid), baseUrl, sheet, specifier, fields, maxUrlLength)
      ]);
      return [...leftResults, ...rightResults];
    }

    // Fetch data if URL length is within limits.
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);

    const results = await response.json().then(res => res.results);
    return results;

  } catch (error) {
    throw error;
  }
};