export const AboutModal = () => {
  return (
    <>
      <h4>FFXIV Furniture Lister</h4>
      <p>A Final Fantasy XIV furniture list maker that quantifies needed resources.</p>
      <ul>
        <li>Total gil prices from NPC gil shops and the market board.</li>
        <li>View recipes and amount of materials required.</li>
        <li>Save lists in the browser.</li>
        <li>Import JSON save files from <a href="https://makeplace.app/" target="_blank">MakePlace</a>.</li>
      </ul>
      <a href="https://github.com/MelvinHK/ffxivHousingLister" target="_blank" className="text-small">GitHub</a>
    </>
  );
};