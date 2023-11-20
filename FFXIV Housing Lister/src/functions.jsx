import { useEffect } from "react";

export const useOutsideIsClicked = (ref, isOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => isOutside(ref.current && !ref.current.contains(event.target));
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [ref]);
};

export const fetchItems = async (name) => {
  try {
    const response = await fetch(`https://xivapi.com/search?string=*${name}*&filters=ItemSortCategory.ID=50&limit=10`);
    if (!response.ok)
      throw new Error(response.status);

    const items = await response.json();
    return items.Results;

  } catch (error) {
    alert(`Error: Unable to search item; something went wrong with the server request.`);
  }
};

export const fetchGilShopPrice = async (id) => {
  try {
    const response = await fetch(`https://xivapi.com/item/${id}`);
    if (!response.ok)
      throw new Error(response.status);

    const item = await response.json();
    return (item.GameContentLinks.hasOwnProperty("GilShopItem")) ? item.PriceMid : null;

  } catch (error) {
    alert(`Error: Unable to fetch gil price; something went wrong with the server request.`);
  }
};

export const fetchMarketBoardPrices = async (ids, location) => {
  try {
    const response = await fetch(`https://universalis.app/api/v2/${location}/${String(ids)}`);
    if (!response.ok)
      throw new Error(response.status);

    const listings = await response.json();
    return ids.length > 1 ? listings.items : { [String(ids)]: listings };

  } catch (error) {
    alert(`Error: Unable to fetch market board prices; something went wrong with the server request.`);
  }
};