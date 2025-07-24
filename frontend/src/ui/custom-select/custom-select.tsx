import classNames from 'classnames';

import { CustomSelectProps } from './custom-select-props.type';

export const CustomSelect = ({
  title,
  selectedValue,
  isOpen,
  isReadonly = false,
  errorMessage,
  className,
  placeholder,
  options,
  nameTransform,
  onListBoxClick,
  onListOptionClick
}: CustomSelectProps) => (
  <div className={ classNames('custom-select', className, {
    'custom-select--readonly': isReadonly,
    'custom-select--not-selected': !isOpen,
    'is-open': isOpen,
    'not-empty': selectedValue,
    'is-invalid': errorMessage
  })}
  >
    <span className="custom-select__label">{ title }</span>
    { placeholder && <div className="custom-select__placeholder">{ placeholder }</div> }
    { errorMessage && <span className="custom-select__error">{ errorMessage }</span> }
    <button
      className="custom-select__button"
      type="button"
      onClick={ onListBoxClick }
      aria-label="Выберите одну из опций"
      disabled={ isReadonly }
    >
      <span className="custom-select__text">{ nameTransform ? nameTransform[selectedValue] : selectedValue }</span>
      <span className="custom-select__icon">
        <svg width="15" height="6" aria-hidden="true">
          <use xlinkHref="#arrow-down"></use>
        </svg>
      </span>
    </button>
    <ul className="custom-select__list" role="listbox">
      { options.map(({ id, value }) => (
        <li
          className="custom-select__item"
          role="option"
          aria-selected={ value === selectedValue }
          key={ id }
          onClick={ () => onListOptionClick(value) }
        >
          { nameTransform ? nameTransform[value] : value }
        </li>
      )) }
    </ul>
  </div>
);
