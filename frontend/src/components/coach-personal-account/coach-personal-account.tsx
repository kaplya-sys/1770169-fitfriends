import {ChangeEvent, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {AppRoute, UserType} from '../../libs/shared/types';
import {Picture} from '../picture';
import {StubGum} from '../stub-gym';
import {getRouteWithParam} from '../../libs/shared/helpers';

type CoachPersonalAccountProps = {
  user: UserType;
  onChangeInput: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export const CoachPersonalAccount = ({user, onChangeInput}: CoachPersonalAccountProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        <Link className="thumbnail-link thumbnail-link--theme-light" to={getRouteWithParam(AppRoute.MyTrainings, {id: user.id})}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-flash"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои тренировки</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.CreateTraining}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-add"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Создать тренировку</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to={getRouteWithParam(AppRoute.MyFriends, {id: user.id})}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои друзья</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to={getRouteWithParam(AppRoute.MyOrders, {id: user.id})}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-bag"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои заказы</span>
        </Link>
        <div className="personal-account-coach__calendar">
          <StubGum/>
        </div>
      </div>
      <div className="personal-account-coach__additional-info">
        <div className="personal-account-coach__label-wrapper">
          <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
          <input
            ref={inputRef}
            className='visualHidden'
            type="file"
            name="qualifications"
            tabIndex={-1}
            accept=".pdf, .jpg, .png"
            multiple
            onChange={onChangeInput}
          />
          <button
            className="btn-flat btn-flat--underlined personal-account-coach__button"
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-import"></use>
            </svg>
            <span>Загрузить</span>
          </button>
          <div className="personal-account-coach__controls">
            <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
        </div>
        <ul className="personal-account-coach__list">
          {user.questionnaire.qualifications?.map((qualification) => (
            <li className="personal-account-coach__item" key={qualification.image}>
              <div className={classNames('certificate-card', {isEdit: 'certificate-card--edit'})}>
                <div className="certificate-card__image">
                  <Picture
                    width={294}
                    height={360}
                    alt={'Сертификат - Биомеханика ударов в боксе'}
                    image={qualification}
                  />
                </div>
                <div className="certificate-card__buttons">
                  <button
                    className={classNames(
                      'btn-flat btn-flat--underlined certificate-card__button',
                      {
                        'certificate-card__button--edit': isEdit,
                        'certificate-card__button--save': !isEdit
                      })}
                    type="button"
                    onClick={() => setIsEdit((prevState) => !prevState)}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span>{isEdit ? 'Изменить' : 'Сохранить'}</span>
                  </button>
                  <div className="certificate-card__controls">
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="16" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-change"></use>
                      </svg>
                    </button>
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
