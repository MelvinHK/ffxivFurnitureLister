import { useEffect } from "react";

export const useOutsideIsClicked = (ref, isOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => isOutside(ref.current && !ref.current.contains(event.target));
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [ref]);
};

export const fetchItems = async (name) => {
  const response = await fetch(`https://xivapi.com/search?string=*${name}*&filters=ItemSortCategory.ID=50&limit=10`);
  const items = await response.json();
  return items.Results;
};

export const fetchGilShopPrice = async (id) => {
  const response = await fetch(`https://xivapi.com/item/${id}`);
  const item = await response.json();
  return (item.GameContentLinks.hasOwnProperty("GilShopItem")) ? item.PriceMid : null;
};

export const fetchMarketBoardPrices = async (ids, location) => {
  const response = await fetch(`https://universalis.app/api/v2/${location}/${String(ids)}`);
  const listings = await response.json();
  return ids.length > 1 ? listings.items : { [String(ids)]: listings };
};