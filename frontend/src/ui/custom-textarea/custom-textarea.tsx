import {ChangeEvent} from 'react';
import classNames from 'classnames';

export type CustomTextareaProps = {
  name: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  isReadonly?: boolean;
  errorMessage?: string;
  fieldText?: string;
  textPosition?: string;
  placeholder?: string;
  onTextareaChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CustomTextarea = ({
  name,
  value,
  defaultValue,
  className,
  isReadonly = false,
  errorMessage,
  fieldText,
  textPosition,
  placeholder,
  onTextareaChange
}: CustomTextareaProps) => (
  <div className={classNames('custom-textarea', className, {
    [`custom-textarea--with-text-${textPosition}`]: fieldText && textPosition,
    'custom-textarea--readonly': isReadonly,
    'custom-textarea--error': errorMessage
  })}
  >
    <label>
      <textarea
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onTextareaChange}
      />
      {fieldText && <span className="custom-textarea__text">{fieldText}</span>}
      {errorMessage && <span className="custom-textarea__error">{errorMessage}</span>}
    </label>
  </div>
);
