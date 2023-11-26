import { useState, useRef, useContext } from 'react';
import { useOutsideIsClicked, fetchItemsByName, getGilShopPrice, fetchMaterials } from '../functions';
import { ItemListContext } from '../App';

function Searchbar() {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [queryStatus, setQueryStatus] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [addItemStatus, setAddItemStatus] = useState("");

  const searchContainer = useRef(null);
  useOutsideIsClicked(searchContainer, setShowResults);

  const { itemList, updateItemListContent } = useContext(ItemListContext);

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
    setAddItemStatus("(adding...)");
    if (itemList.content.find(existingItem => existingItem.id === newItem.id)) {
      setAddItemStatus("");
      return alert("Item already exists in list.");
    }

    newItem.gilShopPrice = getGilShopPrice(queriedItem);
    newItem.materials = await fetchMaterials(queriedItem);

    updateItemListContent([newItem, ...itemList.content]);
    setAddItemStatus("");
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
      <button key={result.ID} onClick={() => handleAddItem(newItem, result)} className='text-left w-full flex'>
        <span>{result.Name}</span>
        {itemList.content.find(existingItem => existingItem.id === result.ID) ?
          <span className='ml-auto text-small'>(added)</span> : <></>
        }
      </button>
    );
  });

  return (
    <div ref={searchContainer} className='relative flex-1'>
      {/* Search Bar */}
      <form className={`flex ${addItemStatus ? `disabled` : ``}`}>
        <input type='text' className="flex-1" value={query} onChange={e => setQuery(e.target.value)} placeholder='Search Item Name'></input>
        <button type='submit' title="Search" onClick={e => handleSubmit(e)} className='flex align-center square-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </form>
      {/* Search Results */}
      {
        showResults ? <></> :
          <div id="search-results" className='flex-col absolute w-full'>
            {queryResultsDisplay}
            {queryStatus ? <div className="pad black">{queryStatus}</div> : <></>}
            {addItemStatus ? <div className="status-overlay">Adding...</div> : <></>}
          </div>
      }
    </div >
  );
}

export default Searchbar;