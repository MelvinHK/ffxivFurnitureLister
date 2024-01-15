export const TotalMaterialsModal = ({ totalMaterials }) => {
  const materialsList = Object.entries(totalMaterials)
    .map(([materialName, quantity]) => ({ materialName, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .map(({ materialName, quantity }) => (
      <p className="text-small" key={materialName}>
        {quantity} {materialName}
      </p>
    ));

  return (<>
    <h4>Total Materials</h4>
    {materialsList.length > 0 ? (

      <div className="column-container">
        {materialsList}
      </div>
    ) : <p>N/A</p>}
  </>);
};