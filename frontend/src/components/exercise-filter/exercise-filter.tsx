import {ChangeEvent} from 'react';

import {Exercise} from '../../libs/shared/types';
import {EXERCISE_NAMES} from '../../libs/shared/constants';

type ExercisePropsType = {
  className: string;
  modifier: string;
  title: string;
  onFilterChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export const ExerciseFilter = ({className, modifier, title, onFilterChange}: ExercisePropsType) => (
  <div className={`${className}__block ${className}__block--${modifier}`}>
    <h4 className={`${className}__block-title`}>{title}</h4>
    <ul className={`${className}__check-list`}>
      {
        Object.values(Exercise).map((exercise) => (
          <li className={`${className}__check-list-item`} key={exercise}>
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
    <button className="btn-show-more user-catalog-form__btn-show" type="button">
      <span>Посмотреть все</span>
      <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
        <use xlinkHref="#arrow-down"></use>
      </svg>
    </button>
  </div>
);
