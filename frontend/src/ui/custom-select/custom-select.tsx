import classNames from 'classnames';

type CustomSelectProps<T> = {
  title: string;
  selectedValue?: string;
  isOpen: boolean;
  isReadonly?: boolean;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  nameTransform?: Record<string, string>;
  option: Record<Readonly<string>, string>;
  onListBoxClick: () => void;
  onListOptionClick: (option: T) => void;
}

export const CustomSelect = <T,>({
  title,
  selectedValue,
  isOpen,
  isReadonly = false,
  errorMessage,
  className,
  placeholder,
  option,
  nameTransform,
  onListBoxClick,
  onListOptionClick
}: CustomSelectProps<T>) => (
    <div className={classNames('custom-select', className, {
      'custom-select--readonly': isReadonly,
      'custom-select--not-selected': !isOpen,
      'is-open': isOpen,
      'not-empty': selectedValue,
      'is-invalid': errorMessage
    })}
    >
      <span className="custom-select__label">{title}</span>
      {placeholder && <div className="custom-select__placeholder">{placeholder}</div> }
      <span className="custom-select__error">{errorMessage}</span>
      <button
        className="custom-select__button"
        type="button"
        onClick={onListBoxClick}
        aria-label="Выберите одну из опций"
        disabled={isReadonly}
      >
        <span className="custom-select__text">{nameTransform && selectedValue ? nameTransform[selectedValue] : selectedValue}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {Object.values(option).map((value) => (
          <li
            className="custom-select__item"
            role="option"
            aria-selected={value === selectedValue}
            key={value}
            onClick={() => onListOptionClick(value as T)}
          >
            {nameTransform ? nameTransform[value] : value}
          </li>
        ))}
      </ul>
    </div>
  );
