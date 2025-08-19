type QuantityPropsType = {
  selectedValue: number;
  onIncrementClick: () => void;
  onDecrementClick: () => void;
}

export const Quantity = ({selectedValue, onIncrementClick, onDecrementClick}: QuantityPropsType) => (
  <div className="input-quantity">
    <button
      className="btn-icon btn-icon--quantity"
      type="button"
      aria-label="minus"
      onClick={onDecrementClick}
    >
      <svg width="12" height="12" aria-hidden="true">
        <use xlinkHref="#icon-minus"></use>
      </svg>
    </button>
    <div className="input-quantity__input">
      <label>
        <input
          type="text"
          value={selectedValue}
          size={2}
          readOnly
        />
      </label>
    </div>
    <button
      className="btn-icon btn-icon--quantity"
      type="button"
      aria-label="plus"
      onClick={onIncrementClick}
    >
      <svg width="12" height="12" aria-hidden="true">
        <use xlinkHref="#icon-plus"></use>
      </svg>
    </button>
  </div>
);
