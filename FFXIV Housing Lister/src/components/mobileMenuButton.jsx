import { useContext } from "react";
import { ItemListContext } from "../App";

function MobileMenuButton() {
  const { showMobileMenu, setShowMobileMenu } = useContext(ItemListContext);

  return (
    <button id="mobile-menu-btn" className="icon-btn pad-0 flex align-center" onClick={() => setShowMobileMenu(!showMobileMenu)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
      </svg>
    </button>
  );
}

export default MobileMenuButton;