import { useState, useRef, useContext } from 'react';
import { useOutsideIsClicked, fetchItemsByName, getGilShopPrice, fetchMaterials } from '../functions';
import { ItemListContext } from '../App';

function Searchbar() {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [queryStatus, setQueryStatus] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchContainer = useRef(null);
  useOutsideIsClicked(searchContainer, setShowResults);

  const { itemList, setItemList } = useContext(ItemListContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query == null || query.match(/^\s*$/) !== null) return;

    setQueryResults([]);
    setShowResults(false);
    setQueryStatus("Searching...");

    const items = await fetchItemsByName(query);
    if (items) {
      items.length > 0 ? setQueryStatus("") : setQueryStatus(`No results found for "${query}"`);
      setQueryResults(items);
    }
  };

  const handleAddItem = async (newItem, queriedItem) => {
    if (itemList.find(existingItem => existingItem.id === newItem.id))
      return;

    newItem.gilShopPrice = getGilShopPrice(queriedItem);
    newItem.materials = await fetchMaterials(queriedItem);

    setItemList([...itemList, newItem]);
  };

  const queryResultsDisplay = queryResults.map((result) => {
    const newItem = {
      id: result.ID,
      name: result.Name,
      quantity: 1,
      gilShopPrice: null,
      marketBoardPrice: null,
      materials: null,
      isChecked: false
    };

    return (
      <button key={result.ID} onClick={() => handleAddItem(newItem, result)} className='text-left w-full'>
        {result.Name}
      </button>
    );
  });

  return (
    <div ref={searchContainer} className='relative'>
      {/* Search Bar */}
      <form className='flex'>
        <input type='text' className="flex-1" value={query} onChange={e => setQuery(e.target.value)} placeholder='Item Name'></input>
        <button type='submit' onClick={e => handleSubmit(e)}>Search</button>
      </form>
      {/* Search Results */}
      {showResults ? <></> :
        <div className='absolute w-full'>
          {queryResultsDisplay}
          {queryStatus == "" ? <></> : <div className="pad black">{queryStatus}</div>}
        </div>}
    </div>
  );
}

export default Searchbar;