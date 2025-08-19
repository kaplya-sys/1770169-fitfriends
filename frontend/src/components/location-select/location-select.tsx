import classNames from 'classnames';

import {Location, LocationType} from '../../libs/shared/types';
import {LOCATION_NAME} from '../../libs/shared/constants';

type LocationSelectProps = {
  selectedValue: string;
  isOpen: boolean;
  isReadonly?: boolean;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  onListBoxClick: () => void;
  onListOptionClick: (option: LocationType) => void;
}

export const LocationSelect = ({
  selectedValue,
  isOpen,
  isReadonly = false,
  errorMessage,
  className,
  placeholder,
  onListBoxClick,
  onListOptionClick
}: LocationSelectProps) => (
  <div className={classNames('custom-select', className, {
    'custom-select--readonly': isReadonly,
    'custom-select--not-selected': !isOpen,
    'is-open': isOpen,
    'not-empty': selectedValue,
    'is-invalid': errorMessage
  })}
  >
    <span className="custom-select__label">Ваша локация</span>
    {placeholder && <div className="custom-select__placeholder">{placeholder}</div> }
    {errorMessage && <span className="custom-select__error">{errorMessage}</span> }
    <button
      className="custom-select__button"
      type="button"
      onClick={onListBoxClick}
      aria-label="Выберите одну из опций"
      disabled={isReadonly}
    >
      <span className="custom-select__text">{LOCATION_NAME[selectedValue as LocationType]}</span>
      <span className="custom-select__icon">
        <svg width="15" height="6" aria-hidden="true">
          <use xlinkHref="#arrow-down"></use>
        </svg>
      </span>
    </button>
    <ul className="custom-select__list" role="listbox">
      {Object.values(Location).map((location) => (
        <li
          className="custom-select__item"
          role="option"
          aria-selected={location === selectedValue}
          key={location}
          onClick={() => onListOptionClick(location)}
        >
          {LOCATION_NAME[location]}
        </li>
      ))}
    </ul>
  </div>
);
