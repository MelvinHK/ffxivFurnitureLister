import { useEffect } from "react";

export const useOutsideIsClicked = (ref, isOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => isOutside(ref.current && !ref.current.contains(event.target));
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [ref]);
};

export const fetchItems = async (name) => {
  const response = await fetch(`https://xivapi.com/search?string=*${name}*&filters=ItemSearchCategory.Category=4&limit=10`);
  const items = await response.json();
  return items.Results;
};