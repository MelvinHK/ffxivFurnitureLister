import { useContext, useState } from "react";
import { ItemListContext } from "../App";

function SortButton() {
  const [option, setOption] = useState("");
  const { itemList, setItemList } = useContext(ItemListContext);

  const handleSort = (value) => {
    setOption(value);

    switch (value) {
      case "Name":
        sortByName();
        break;
      case "Quantity":
        sortByQuantity();
        break;
      case "Gil":
        sortByGil();
    }
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
      const getPrice = (item) => {
        if (item.gilShopPrice) {
          return item.gilShopPrice * item.quantity;
        } else if (item.marketBoardPrice) {
          if (item.marketBoardPrice === "N/A") {
            return 0;
          } else {
            return item.marketBoardPrice.listings
              .slice(0, item.quantity)
              .reduce((total, listing) => total + listing.pricePerUnit, 0);
          }
        } else {
          return 0;
        }
      };

      return getPrice(b) - getPrice(a);
    });

    setItemList(sortedList);
  };

  return (
    <div className="flex align-center text-nowrap">
      <form>
        <select className={`${option == "" ? `default-option` : ``}`} defaultValue="default" onChange={e => handleSort(e.target.value)}>
          <option value="default" disabled>Sort By</option>
          <option>Name</option>
          <option>Quantity</option>
          <option>Gil</option>
        </select>
      </form>
    </div>
  );
};

export default SortButton;