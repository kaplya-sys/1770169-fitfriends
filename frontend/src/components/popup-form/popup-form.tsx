import { PopupFormProps } from './popup-form-props.type';

export const PopupForm = ({
  blockClassName,
  title,
  agreementISChecked = true,
  children,
  onFormSubmit
}: PopupFormProps) => (
  <div className={ `popup-form popup-form--${ blockClassName}` }>
    <div className="popup-form__wrapper">
      <div className="popup-form__content">
        {
          blockClassName !== 'questionnaire-user' &&
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">{ title }</h1>
          </div>
        }
        <div className="popup-form__form">
          <form onSubmit={ onFormSubmit }>
            <div className={ blockClassName }>
              { children }
              <button
                className={ `btn ${ blockClassName }__button` }
                type="submit"
                disabled={ !agreementISChecked }
              >Продолжить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
