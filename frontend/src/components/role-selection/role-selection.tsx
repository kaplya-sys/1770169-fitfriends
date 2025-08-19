import {ChangeEvent} from 'react';

import {Role} from '../../libs/shared/types';

type RoleSelectionProps = {
  blockClassName: string;
  value: string;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export const RoleSelection = ({
  blockClassName,
  value,
  onInputChange
}: RoleSelectionProps) => (
  <div className={`${blockClassName}__role`}>
    <h2 className={`${blockClassName}__legend`}>Выберите роль</h2>
    <div className="role-selector sign-up__role-selector">
      <div className="role-btn">
        <label>
          <input
            className="visually-hidden"
            type="radio"
            name="role"
            value={Role.Coach}
            checked={Role.Coach === value}
            onChange={onInputChange}
          />
          <span className="role-btn__icon">
            <svg width="12" height="13" aria-hidden="true">
              <use xlinkHref="#icon-cup"></use>
            </svg>
          </span>
          <span className="role-btn__btn">Я хочу тренировать</span>
        </label>
      </div>
      <div className="role-btn">
        <label>
          <input
            className="visually-hidden"
            type="radio"
            name="role"
            value={Role.User}
            checked={Role.User === value}
            onChange={onInputChange}
          />
          <span className="role-btn__icon">
            <svg width="12" height="13" aria-hidden="true">
              <use xlinkHref="#icon-weight"></use>
            </svg>
          </span>
          <span className="role-btn__btn">Я хочу тренироваться</span>
        </label>
      </div>
    </div>
  </div>
);

