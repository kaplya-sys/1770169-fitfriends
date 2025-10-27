import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {AppRoute, Role, UserType} from '../../libs/shared/types';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {Picture} from '../picture';

type UserCardProps = {
  className: string;
  user: UserType;
  isDark?: boolean;
}

export const UserCard = ({className, user, isDark = false}: UserCardProps) => (
  <li className={className}>
    <div className={classNames('thumbnail-user', {
      'thumbnail-user--role-user': user.role === Role.User,
      'thumbnail-user--role-coach': user.role === Role.Coach,
      'thumbnail-user--dark': isDark
    })}
    >
      <div className="thumbnail-user__image">
        {user.avatar ?
          <Picture
            width={82}
            height={82}
            alt=''
            image={user.avatar}
          /> :
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg>}
        {/*<div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-crown"></use>
          </svg>
        </div>*/}
      </div>
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{user.name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">{user.station.station}</address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        {user.questionnaire.exercises
          .map((exercise) => (
            <li className="thumbnail-user__hashtags-item" key={exercise}>
              <div className="hashtag thumbnail-user__hashtag">
                <span>{`#${exercise}`}</span>
              </div>
            </li>
          ))}
      </ul>
      <Link
        className={classNames('btn btn--medium thumbnail-user__button', {
          'btn--dark-bg': user.role === Role.Coach || isDark,
          'btn--outlined': isDark
        })}
        to={getRouteWithParam(AppRoute.UserInfo, {id: user.id})}
      >
        Подробнее
      </Link>
    </div>
  </li>
);
