import { useState, useRef, useContext } from 'react';
import { useOutsideIsClicked, fetchItems, fetchGilShopPrice } from '../functions';
import { ItemListContext } from '../App';

function Searchbar() {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [queryStatus, setQueryStatus] = useState("");
  const [isResultsHidden, setIsResultsHidden] = useState(false);

  const searchContainer = useRef(null);
  useOutsideIsClicked(searchContainer, setIsResultsHidden);

  const { itemList, setItemList } = useContext(ItemListContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query == null || query.match(/^\s*$/) !== null) return;

    setQueryResults([]);
    setIsResultsHidden(false);
    setQueryStatus("Searching...");

    const items = await fetchItems(query);
    if (items) {
      items.length > 0 ? setQueryStatus("") : setQueryStatus(`No results found for "${query}"`);
      setQueryResults(items);
    }
  };

  const handleAddItem = async (newItem) => {
    if (itemList.find(existingItem => existingItem.id === newItem.id))
      return;
    newItem.gilShopPrice = await fetchGilShopPrice(newItem.id);
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
      <button key={result.ID} onClick={() => handleAddItem(newItem)} className='text-left w-full'>
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
      {isResultsHidden ? <></> :
        <div className='absolute w-full'>
          {queryResultsDisplay}
          {queryStatus == "" ? <></> : <div className="pad black">{queryStatus}</div>}
        </div>}
    </div>
  );
}

export default Searchbar;