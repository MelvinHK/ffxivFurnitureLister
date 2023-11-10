import { useContext } from "react";
import ItemRow from "./itemRow";
import { ItemListContext } from '../App';

function ItemList() {
  const { itemList, setItemList } = useContext(ItemListContext);

  return (
    <div className='flex-1'>
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