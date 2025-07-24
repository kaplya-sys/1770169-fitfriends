import classNames from 'classnames';

import { CustomTextareaProps } from './custom-textarea-props.type';

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
  <div className={ classNames(className, 'custom-textarea', {
    [`custom-textarea--with-text-${ textPosition }`]: fieldText && textPosition,
    'custom-textarea--readonly': isReadonly,
    'custom-textarea--error': errorMessage
  })}
  >
    <label>
      <textarea
        name={ name }
        value={ value }
        defaultValue={ defaultValue }
        placeholder={ placeholder }
        onChange={ onTextareaChange }
      />
      { fieldText && <span className="custom-textarea__text">{ fieldText }</span> }
      { errorMessage && <span className="custom-textarea__error">{ errorMessage }</span> }
    </label>
  </div>
);
