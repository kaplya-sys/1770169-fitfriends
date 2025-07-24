import { Specialization } from '@fitfriends/lib/shared/types';

import { SpecializationsGroupProps } from './specializations-group-props.type';

export const SpecializationsGroup = ({
  blockClassName,
  options,
  selectedValue,
  isDisabled,
  onInputChange
}: SpecializationsGroupProps) => (
  <div className={ `specialization-checkbox ${ blockClassName }__specializations` }>
    {
      options.map(({ id, name, value, label }) => (
        <div className="btn-checkbox" key={ id }>
          <label>
            <input
              className="visually-hidden"
              type="checkbox"
              name={ name }
              value={ value }
              disabled={ isDisabled }
              checked= { selectedValue.includes(value as Specialization) }
              onChange={ onInputChange }
            />
            <span className="btn-checkbox__btn">{ label }</span>
          </label>
        </div>
      ))
    }
  </div>
);
