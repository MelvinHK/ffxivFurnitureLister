export const GilInfoModal = () => {
  return (<>
    <h4>Gil Column Info</h4>

    <p className="flex align-center">
      <span className="flex align-center">&#119909;<img className="icon" src="gilShopIcon.webp"></img></span>
      &nbsp;= Purchased from NPCs using gil.
    </p>

    <p className="flex align-start">
      <span className="flex align-center">?<img className="icon" src="marketBoardIcon.webp"></img></span>
      &nbsp;= Not sold by NPCs for gil; price could be fetched from the market board.
    </p>

    <p className="flex align-center mb-0">
      <span className="flex align-center">&#119909;<img className="icon" src="marketBoardIcon.webp"></img></span>
      &nbsp;= Purchased from the market board.
    </p>
    <ul className="mt-0">
      <li>Click to view individual stock details.</li>
      <li>Red/Crossed out = quantity exceeds available stock.</li>
    </ul>

    <p className="flex align-center">N/A = No available gil source.</p>
  </>);
};