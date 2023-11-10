import { useState, useRef, useContext } from 'react';
import { useOutsideIsClicked, fetchItems } from '../functions';
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

    items.length > 0 ? setQueryStatus("") : setQueryStatus(`No results found for "${query}"`);
    setQueryResults(items);
  };

  const handleAddItem = (newItem) => {
    if (itemList.find(existingItem => existingItem.id === newItem.id))
      return;
    setItemList([...itemList, newItem]);
  };

  return (
    <div ref={searchContainer} className='relative'>
      {/* Search Bar */}
      <form className='flex'>
        <input type='text' value={query} onChange={e => setQuery(e.target.value)}></input>
        <button type='submit' onClick={e => handleSubmit(e)}>
          Search
        </button>
      </form>
      {/* Search Results */}
      {isResultsHidden ? <></> :
        <div className='absolute w-full'>
          {queryResults.map((result) => {
            const newItem = {
              id: result.ID,
              name: result.Name,
              quantity: 1,
              gil: null,
              materials: null
            };
            return (
              <button key={result.ID} onClick={() => handleAddItem(newItem)} className='text-left w-full'>
                {result.Name}
              </button>
            );
          })}
          <div className="pad">{queryStatus}</div>
        </div>
      }
    </div>
  );
}

export default Searchbar;