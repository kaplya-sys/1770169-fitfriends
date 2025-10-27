import {ChangeEvent} from 'react';
import classNames from 'classnames';

export type CustomInputProps = {
  label?: string;
  type: string;
  name: string;
  value?: string;
  isReadonly?: boolean;
  errorMessage?: string;
  className?: string;
  fieldText?: string;
  textPosition?: string;
  min?: string | number;
  max?: string | number;
  autoComplete?: string;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

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
  <div className={classNames(className, 'custom-input', {
    'custom-input--error': errorMessage,
    'custom-input--readonly': isReadonly,
    [`custom-input--with-text-${textPosition}`]: fieldText && textPosition,
  })}
  >
    <label>
      {label && <span className="custom-input__label">{label}</span>}
      <span className="custom-input__wrapper">
        <input
          type={type}
          name={name}
          value={value}
          min={min}
          max={max}
          autoComplete={autoComplete}
          onChange={onInputChange}
        />
        {fieldText && <span className="custom-input__text">{fieldText}</span>}
      </span>
      <span className="custom-input__error">{errorMessage}</span>
    </label>
  </div>
);
