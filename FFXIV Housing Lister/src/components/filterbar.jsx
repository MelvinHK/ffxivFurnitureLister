function Filterbar({ filterText, setFilterText }) {
  return (
    <input type="text" value={filterText} onChange={e => setFilterText(e.target.value)} placeholder="Filter Names..." ></input>
  );
}

export default Filterbar;