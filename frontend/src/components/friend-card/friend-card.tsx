import classNames from 'classnames';

import {EXERCISE_NAMES, LOCATION_NAME} from '../../libs/shared/constants';
import {Role, UserType} from '../../libs/shared/types';
import {Picture} from '../picture';

type FriendCardPropsType = {
  user: UserType;
  joinTrainingStatus: boolean;
  personalTrainingStatus: boolean;
}

export const FriendCard = ({user, joinTrainingStatus, personalTrainingStatus}: FriendCardPropsType) => (
  <li className="friends-list__item">
    <div className="thumbnail-friend">
      <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
        <div className="thumbnail-friend__image-status">
          <div className="thumbnail-friend__image">
            {user.avatar ?
              <Picture
                width={78}
                height={78}
                alt=''
                image={user.avatar}
              /> :
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-import"></use>
              </svg>}
            {/*<div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>*/}
          </div>
        </div>
        <div className="thumbnail-friend__header">
          <h2 className="thumbnail-friend__name">{user.name}</h2>
          <div className="thumbnail-friend__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-friend__location-address">{LOCATION_NAME[user.location]}</address>
          </div>
        </div>
        <ul className="thumbnail-friend__training-types-list">
          {user.questionnaire.exercises.map((exercise) => (
            <li key={exercise}>
              <div className="hashtag thumbnail-friend__hashtag">
                <span>{`#${EXERCISE_NAMES[exercise]}`}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="thumbnail-friend__activity-bar">
          <div className={classNames('thumbnail-friend__ready-status', {
            'thumbnail-friend__ready-status--is-ready': user.isReady,
            'thumbnail-friend__ready-status--is-not-ready': !user.isReady
          })}
          >
            <span>{user.isReady ? 'Готов к&nbsp;тренировке' : 'Не&nbsp;готов к&nbsp;тренировке'}</span>
          </div>
          {user.role === Role.User &&
            <button className={classNames('thumbnail-friend__invite-button', {'is-disabled': !joinTrainingStatus})} type="button">
              <svg width="43" height="46" aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite"></use>
              </svg>
              <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
            </button>}
        </div>
      </div>
      {user.role === Role.User ?
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
          <div className="thumbnail-friend__button-wrapper">
            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
          </div>
        </div> :
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
          <div className="thumbnail-friend__button-wrapper">
            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
          </div>
        </div>}
      {/*
        <div class="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p class="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку отклонён</p>
        </div>
        <div class="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p class="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку принят</p>
        </div>
        <div class="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
          <p class="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку принят</p>
        </div>
        <div class="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
          <p class="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку отклонён</p>
        </div>
      */}
    </div>
  </li>
);
