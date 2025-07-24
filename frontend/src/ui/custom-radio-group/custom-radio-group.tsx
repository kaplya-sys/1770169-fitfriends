import classNames from 'classnames';

import { CustomRadioGroupProps} from './custom-radio-group-props.type';

export const CustomRadioGroup = ({
  selectedValue,
  options,
  className,
  isBig = true,
  onInputChange
}: CustomRadioGroupProps) => (
  <div className={ classNames(className, 'custom-toggle-radio', {
    'custom-toggle-radio--big': isBig
  })}
  >
    {
      options.map(({ id, name, value, label }) => (
        <div className="custom-toggle-radio__block" key={ id }>
          <label>
            <input
              type="radio"
              name={ name }
              value={ value }
              checked={ selectedValue === value }
              onChange={ onInputChange }
            />
            <span className="custom-toggle-radio__icon"></span>
            <span className="custom-toggle-radio__label">{ label }</span>
          </label>
        </div>
      ))
    }
  </div>
);
