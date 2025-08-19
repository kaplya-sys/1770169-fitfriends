import {Link} from 'react-router-dom';

import {AppRoute, UserType} from '../../libs/shared/types';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {Picture} from '../picture';

type UserCardProps = {
  className: string;
  user: UserType;
}

export const UserCard = ({className, user}: UserCardProps) => (
  <li className={className}>
    <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
      {user.avatar &&
        <div className="thumbnail-user__image">
          <Picture
            width={82}
            height={82}
            alt=''
            image={user.avatar}
          />
        </div>}
      {/*<div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
        <svg width="12" height="12" aria-hidden="true">
          <use xlinkHref="#icon-crown"></use>
        </svg>
      </div>*/}
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{user.name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">{user.location}</address>
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
        className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
        to={getRouteWithParam(AppRoute.PersonalAccount, {id: user.id})}
      >
        Подробнее
      </Link>
    </div>
  </li>
);
