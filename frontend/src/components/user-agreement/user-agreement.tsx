import { UserAgreementProps } from './user-agreement-props.type';

export const UserAgreement = ({ blockClassName, checked, onUserAgreementChange }: UserAgreementProps) => (
  <div className={ `${ blockClassName }__checkbox` }>
    <label>
      <input
        type="checkbox"
        value="user-agreement"
        name="user-agreement"
        checked={ checked }
        onChange={ onUserAgreementChange }
      />
      <span className={ `${ blockClassName }__checkbox-icon` }>
        <svg width="9" height="6" aria-hidden="true">
          <use xlinkHref="#arrow-check"></use>
        </svg>
      </span>
      <span className={ `${ blockClassName }__checkbox-label` }>Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
    </label>
  </div>
);
