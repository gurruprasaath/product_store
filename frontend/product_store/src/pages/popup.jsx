 function PopupComponent({ onClose }) {
      return (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>This is a Pop-up!</h2>
            <p>Some content goes here.</p>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      );
}
export default PopupComponent;