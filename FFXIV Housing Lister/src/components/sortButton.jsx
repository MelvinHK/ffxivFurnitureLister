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
      return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
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
      const comparisons = [a, b];

      for (let i = 0; i < comparisons.length; i++) {
        if (!comparisons[i].gilShopPrice && comparisons[i].marketBoardPrice) {
          let marketPriceTotal = 0;

          for (let j = 0; j < comparisons[i].quantity; j++)
            marketPriceTotal += comparisons[i].marketBoardPrice.listings[j].pricePerUnit;

          comparisons[i] = marketPriceTotal;
        } else {
          comparisons[i] = comparisons[i].gilShopPrice * comparisons[i].quantity;
        }
      }
      return comparisons[1] - comparisons[0];
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