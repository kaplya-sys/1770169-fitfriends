import classNames from 'classnames';

import {EXERCISE_NAMES, STATION_NAME} from '../../libs/shared/constants';
import {
  AuthenticatedUserType,
  Role,
  UserApplicationStatus,
  UserApplicationStatusType,
  UserApplicationType,
  UserType
} from '../../libs/shared/types';
import {Picture} from '../picture';

type FriendCardPropsType = {
  user: UserType;
  userApplications: UserApplicationType[];
  authenticatedUser: AuthenticatedUserType;
  onInviteClick: (userId: string) => void;
  onAcceptOrRejectClick: (applicationId: string, status: UserApplicationStatusType) => void;
}

export const FriendCard = ({
  user,
  authenticatedUser,
  userApplications,
  onInviteClick,
  onAcceptOrRejectClick
}: FriendCardPropsType) => {
  const incomingApplication = userApplications.find((userApplication) => userApplication.initiatorId === user.id);
  const outgoingApplication = userApplications.find((userApplication) => userApplication.userId === user.id);

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className={classNames('thumbnail-friend__info', {
          'thumbnail-friend__info--theme-light': user.role === Role.User,
          'thumbnail-friend__info--theme-dark': user.role === Role.Coach
        })}
        >
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              {
                user.avatar ?
                  <Picture
                    width={78}
                    height={78}
                    alt=''
                    image={user.avatar}
                  /> :
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-import"></use>
                  </svg>
              }
              {/*<div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>*/}
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{user.name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">
                {STATION_NAME[user.station.station]}
              </address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {
              user.questionnaire.exercises.map((exercise) => (
                <li key={exercise}>
                  <div className="hashtag thumbnail-friend__hashtag">
                    <span>{`#${EXERCISE_NAMES[exercise]}`}</span>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className={classNames('thumbnail-friend__ready-status', {
              'thumbnail-friend__ready-status--is-ready': user.isReady,
              'thumbnail-friend__ready-status--is-not-ready': !user.isReady
            })}
            >
              <span>{user.isReady ? 'Готов к\u00A0тренировке' : 'Не\u00A0готов к\u00A0тренировке'}</span>
            </div>
            {
              (user.role === Role.User && user.isReady) &&
                <button
                  className={classNames('thumbnail-friend__invite-button', {
                    'is-disabled': !!outgoingApplication
                  })}
                  type="button"
                  onClick={() => onInviteClick(user.id)}
                >
                  <svg width="43" height="46" aria-hidden="true" focusable="false">
                    <use xlinkHref="#icon-invite"></use>
                  </svg>
                  <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
                </button>
            }
          </div>
        </div>
        {
          (incomingApplication && incomingApplication.status === UserApplicationStatus.Pending) &&
            <div className={classNames('thumbnail-friend__request-status', {
              'thumbnail-friend__request-status--role-user': user.role === Role.User,
              'thumbnail-friend__request-status--role-coach': user.role === Role.Coach
            })}
            >
              <p className="thumbnail-friend__request-text">
                {
                  authenticatedUser.role === Role.User ?
                    'Запрос на\u00A0совместную тренировку' :
                    'Запрос на\u00A0персональную тренировку'
                }
              </p>
              <div className="thumbnail-friend__button-wrapper">
                <button
                  className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                  type="button"
                  onClick={() => onAcceptOrRejectClick(incomingApplication.id, UserApplicationStatus.Accepted)}
                >
                  Принять
                </button>
                <button
                  className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                  type="button"
                  onClick={() => onAcceptOrRejectClick(incomingApplication.id, UserApplicationStatus.Rejected)}
                >
                  Отклонить
                </button>
              </div>
            </div>
        }
        {
          (outgoingApplication && outgoingApplication.status !== UserApplicationStatus.Pending) &&
          <div className={classNames('thumbnail-friend__request-status', {
            'thumbnail-friend__request-status--role-user': user.role === Role.User,
            'thumbnail-friend__request-status--role-coach': user.role === Role.Coach
          })}
          >
            {
              user.role === Role.User ?
                <p className="thumbnail-friend__request-text">
                  {
                    outgoingApplication.status === UserApplicationStatus.Rejected ?
                      'Запрос на\u00A0совместную тренировку отклонён' :
                      'Запрос на\u00A0совместную тренировку принят'
                  }
                </p> :
                <p className="thumbnail-friend__request-text">
                  {
                    outgoingApplication.status === UserApplicationStatus.Rejected ?
                      'Запрос на\u00A0персональную тренировку отклонён' :
                      'Запрос на\u00A0персональную тренировку принят'
                  }
                </p>
            }
          </div>
        }
      </div>
    </li>
  );
};
