import { useContext } from "react";
import ItemRow from "./itemRow";
import { ItemListContext } from '../App';
import SortButton from "./sortButton";
import RemoveButton from "./removeButton";

function ItemList() {
  const { itemList } = useContext(ItemListContext);

  return (
    <div id="item-list" className='flex-1 flex-col gap'>
      <div className="flex gap">
        <SortButton />
        <RemoveButton />
      </div>
      <table className='w-full'>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Gil</th>
            <th>Materials</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map(item => <ItemRow key={item.id} item={item} />)}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;