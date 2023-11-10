import ItemRow from "./itemRow";

function ItemList({ itemList }) {

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