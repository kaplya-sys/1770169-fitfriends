import classNames from 'classnames';

import { CustomInputProps } from './custom-input-props.type';

export const CustomInput = ({
  label,
  type,
  name,
  value,
  errorMessage,
  isReadonly = false,
  className,
  fieldText,
  textPosition,
  autoComplete,
  min,
  max,
  onInputChange
}: CustomInputProps) => (
  <div className={ classNames(className, 'custom-input', {
    'custom-input--error': errorMessage,
    'custom-input--readonly': isReadonly,
    [`custom-input--with-text-${ textPosition }`]: fieldText && textPosition,
  })}
  >
    <label>
      { label && <span className="custom-input__label">{ label }</span> }
      <span className="custom-input__wrapper">
        <input
          type={ type }
          name={ name }
          value={ value }
          min={ min }
          max={ max }
          autoComplete={ autoComplete }
          onChange={ onInputChange }
        />
        { fieldText && <span className="custom-input__text">{ fieldText }</span> }
      </span>
      { errorMessage && <span className="custom-input__error">{ errorMessage }</span> }
    </label>
  </div>
);
