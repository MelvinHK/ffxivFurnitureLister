import { useContext, useState } from "react";
import { ItemListContext } from "../App";

function SortButton() {
  const [isSelected, setIsSelected] = useState(false);
  const { itemList, updateItemListContent } = useContext(ItemListContext);

  const sortBy = (compareFn) => [...itemList.content].sort(compareFn);

  const getPrice = (item) => {
    if (item.gilShopPrice)
      return item.gilShopPrice * item.quantity;

    else if (item.marketBoardPrice)
      return (item.marketBoardPrice === "N/A") ? 0 :
        item.marketBoardPrice.listings
          .slice(0, item.quantity)
          .reduce((total, listing) => total + listing.pricePerUnit, 0);

    else return 0;
  };

  const options = ["Name", "Quantity", "Gil"];

  const handleSortOption = (option) => {
    setIsSelected(true);

    const getSortedList = () => {
      switch (option) {
        case options[0]:
          return sortBy((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        case options[1]:
          return sortBy((a, b) => b.quantity - a.quantity);
        case options[2]:
          return sortBy((a, b) => getPrice(b) - getPrice(a));
        default:
          return null;
      }
    };

    const sortedList = getSortedList();
    sortedList && updateItemListContent(sortedList);
  };

  return (
    <div className="flex align-center text-nowrap">
      <form>
        <select
          className={`${!isSelected ? `default-option` : ``}`}
          defaultValue="default"
          onChange={e => handleSortOption(e.target.value)}
        >
          <option value="default" disabled>Sort By</option>
          {options.map(type => <option key={type}>{type}</option>)}
        </select>
      </form>
    </div>
  );
};

export default SortButton;