import { useContext } from "react";
import ItemRow from "./itemRow";
import { ItemListContext } from '../App';
import SortButton from "./sortButton";
import RemoveButton from "./removeButton";
import AboutButton from "./aboutButton";

function ItemList() {
  const { itemList } = useContext(ItemListContext);

  return (
    <div id="item-list" className='flex-1 flex-col gap'>
      <div className="flex gap">
        <SortButton />
        <RemoveButton />
        <AboutButton />
      </div>
      <div id="item-table-container">
        <table className='w-full'>
          <colgroup>
            <col id="name-col"></col>
            <col id="quantity-col"></col>
            <col id="gil-col"></col>
            <col id="materials-col"></col>
          </colgroup>
          <tbody>
            {itemList.map(item => <ItemRow key={item.id} item={item} />)}
          </tbody>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Gil</th>
              <th>Materials</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default ItemList;