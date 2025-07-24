import { useMemo } from 'react';

import { Specialization } from '@fitfriends/lib/shared/types';
import { SPECIALIZATION_NAMES } from '../../lib/shared/constants';
import { SpecializationPropsType } from './specialization-props.type';

export const SpecializationsFilter = ({ onFilterChange }: SpecializationPropsType) => {
  const specializations = useMemo(
    () => Object.values(Specialization).map(
      (specialization) => ({ id: crypto.randomUUID(), specialization })), []
  );

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--type">
      <h4 className="gym-catalog-form__block-title">Тип</h4>
      <ul className="gym-catalog-form__check-list">
        {
          specializations.map(({ id, specialization }) => (
            <li className="gym-catalog-form__check-list-item" key={ id }>
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={ specialization }
                    name="type"
                    onChange={ onFilterChange }
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">{ SPECIALIZATION_NAMES[specialization] }</span>
                </label>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
