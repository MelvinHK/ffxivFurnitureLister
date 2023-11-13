import { useContext, useState } from "react";
import { ItemListContext } from "../App";

function SortButton() {
  const [sortOption, setSortOption] = useState("-");

  const { itemList, setItemList } = useContext(ItemListContext);

  const handleSort = (value) => {
    setSortOption(value);
    if (value == "Name")
      sortByName();
    else if (value == "Quantity")
      sortByQuantity();
    else if (value == "Gil")
      sortByGil();
  };

  const sortByName = () => {
    const sortedList = [...itemList].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });

    setItemList(sortedList);
  };

  const sortByQuantity = () => {
    const sortedList = [...itemList].sort((a, b) => {
      return b.quantity - a.quantity;
    });
    setItemList(sortedList);
  };

  const sortByGil = () => {
    const sortedList = [...itemList].sort((a, b) => {
      const items = [a, b];

      for (let i = 0; i < items.length; i++) {
        if (items[i].gilShopPrice == null) {
          let marketPriceTotal = 0;
          for (let j = 0; j < items[i].quantity; j++)
            marketPriceTotal += items[i].marketBoardPrice.listings[j].pricePerUnit;
          items[i] = marketPriceTotal;
        } else {
          items[i] = items[i].gilShopPrice * items[i].quantity;
        }
      }
      return items[1] - items[0];
    });

    setItemList(sortedList);
  };

  return (
    <div className="flex align-center">
      <label className="pad">Sort By</label>
      <form>
        <select value={sortOption} onChange={e => handleSort(e.target.value)}>
          <option>-</option>
          <option>Name</option>
          <option>Quantity</option>
          <option>Gil</option>
        </select>
      </form>
    </div>
  );
};

export default SortButton;