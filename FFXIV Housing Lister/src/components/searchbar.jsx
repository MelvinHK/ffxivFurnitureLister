import { useState, useRef } from 'react';
import { useOutsideClickAlerter } from '../functions';

function Searchbar() {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [queryStatus, setQueryStatus] = useState("");
  const [isResultsHidden, setIsResultsHidden] = useState(false);

  const resultsRef = useRef(null);
  useOutsideClickAlerter(resultsRef, setIsResultsHidden);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query == null || query.match(/^\s*$/) !== null) return;

    setQueryResults([]);
    setIsResultsHidden(false);
    setQueryStatus("Searching...");

    const response = await fetch(`https://xivapi.com/search?string=*${query}*&filters=ItemSearchCategory.Category=4&limit=10`);
    const items = await response.json();

    items.Results.length > 0 ? setQueryStatus("") : setQueryStatus(`No results found for "${query}"`);
    setQueryResults(items.Results);
  };

  return (
    <>
      <div ref={resultsRef} className='relative'>
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
            {queryResults.map((result) =>
              <button key={result.ID} className='text-left w-full'>{result.Name}</button>
            )}
            <div className="pad">{queryStatus}</div>
          </div>
        }
      </div>
    </>
  );
}

export default Searchbar;