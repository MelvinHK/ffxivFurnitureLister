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
          {itemList.map((item) => {
            return (
              <tr key={item.id}>
                <td className="pad">{item.name}</td>
                <td className="pad">{item.quantity}</td>
                <td className="pad">{item.gil}</td>
                <td className="pad">{item.materials}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;