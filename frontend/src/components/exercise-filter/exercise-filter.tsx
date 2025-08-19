import {ChangeEvent} from 'react';

import {Exercise} from '../../libs/shared/types';
import {EXERCISE_NAMES} from '../../libs/shared/constants';

type ExercisePropsType = {
  onFilterChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}


export const ExerciseFilter = ({onFilterChange}: ExercisePropsType) => (
  <div className="gym-catalog-form__block gym-catalog-form__block--type">
    <h4 className="gym-catalog-form__block-title">Тип</h4>
    <ul className="gym-catalog-form__check-list">
      {
        Object.values(Exercise).map((exercise) => (
          <li className="gym-catalog-form__check-list-item" key={exercise}>
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  value={exercise}
                  name="type"
                  onChange={onFilterChange}
                />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">{EXERCISE_NAMES[exercise]}</span>
              </label>
            </div>
          </li>
        ))
      }
    </ul>
  </div>
);
