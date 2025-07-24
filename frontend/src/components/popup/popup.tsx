import classNames from 'classnames';

import { PopupPropsType } from './popup-props.type';

export const Popup = ({ isActive, blockClassName, title, children, onCloseClick }: PopupPropsType) => (
  <div className={ classNames('wrapper modal modal--buy', { 'is-active': isActive }) }>
    <main>
      <div className={classNames('popup-form', `popup-form--${blockClassName}`)}>
        <section className="popup">
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">{ title }</h2>
              <button
                className="btn-icon btn-icon--outlined btn-icon--big"
                type="button"
                aria-label="close"
                onClick={ onCloseClick }
              >
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div className={classNames('popup__content', `popup__content--${blockClassName}`)}>
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
);
