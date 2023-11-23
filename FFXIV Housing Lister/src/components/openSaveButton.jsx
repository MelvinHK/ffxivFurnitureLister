function OpenSaveButton() {
  return (
    <div>
      <h4>Save in Browser</h4>
      <p className="text-small">Open/Save lists you've created.</p>
      <div className="flex w-full">
        <button className="flex-1">Open</button>
        <button className="flex-1">Save</button>
      </div>
    </div>
  );
}

export default OpenSaveButton;