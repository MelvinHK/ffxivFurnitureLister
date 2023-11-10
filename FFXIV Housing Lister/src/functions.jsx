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

export const updateItemInList = (itemList, setItemList, id, property, newValue) => {
  for (let i = 0; i < itemList.length; i++)
    if (itemList[i].id == id) {
      const updatedItemList = { ...itemList[i], [property]: newValue };
      const newItemList = [
        ...itemList.slice(0, i),
        updatedItemList,
        ...itemList.slice(i + 1)
      ];
      setItemList(newItemList);
      return true;
    }

  return false;
};