export const MarketBoardModal = ({ item, unitsForSale }) => {
  const slicedListings = item.marketBoardPrice.listings.slice(0, item.quantity);
  return (
    <>
      <p className="mb-0">Displaying {slicedListings.length} / {unitsForSale} in stock:</p>
      <table className='w-full'>
        <thead>
          <tr>
            <th>Gil</th>
            <th>World</th>
            <th>Retainer</th>
          </tr>
        </thead>
        <tbody>
          {slicedListings.map((unit) =>
            <tr key={unit.listingID}>
              <td>
                {unit.pricePerUnit}
              </td>
              <td>
                {unit.worldName || item.marketBoardPrice.worldName}
              </td>
              <td>
                {unit.retainerName}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};