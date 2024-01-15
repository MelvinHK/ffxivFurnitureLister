export const GilInfoModal = () => {
  return (<>
    <h4>Gil Column Info</h4>

    <p className="flex align-center">
      &#119909;<img className="icon" src="gilShopIcon.webp"></img>&nbsp;= purchased from NPC gil exchange.
    </p>

    <p className="flex align-center">Empty = not sold by NPC gil exchange; gil price may be fetched from the market board.</p>

    <p className="flex align-center mb-0">
      &#119909;<img className="icon" src="marketBoardIcon.webp"></img>&nbsp;= purchased from the market board.
    </p>
    <ul className="mt-0">
      <li>Click to view individual stock details.</li>
      <li>Red/Crossed out = quantity exceeds available stock.</li>
    </ul>

    <p className="flex align-center">N/A = no available gil source.</p>
  </>);
};