function ItemList() {
  return (
    <div className='flex-1'>
      <table className='w-full'>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default ItemList;