import {MouseEvent} from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';

import {AppRoute} from '../../libs/shared/types';
import {Notification} from '../notification';
import {useAppSelector} from '../../hooks';
import {selectAuthenticatedUser, selectNotifications} from '../../store';
import {getRouteWithParam} from '../../libs/shared/helpers';

type NavigationPropsType = {
  onDeleteClick: (evt: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const Navigation = ({onDeleteClick}: NavigationPropsType) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const notifications = useAppSelector(selectNotifications);

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <NavLink
            className={({isActive}) => classNames('main-nav__link', {'is-active': isActive})}
            to={AppRoute.Home}
            aria-label="На главную"
            end
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-home"></use>
            </svg>
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink
            className={({isActive}) => classNames('main-nav__link', {'is-active': isActive})}
            to={getRouteWithParam(AppRoute.PersonalAccount, {id: user?.id})}
            aria-label="Личный кабинет"
            end
          >
            <svg width="16" height="18" aria-hidden="true">
              <use xlinkHref="#icon-user"></use>
            </svg>
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink
            className={({isActive}) => classNames('main-nav__link', {'is-active': isActive})}
            to={getRouteWithParam(AppRoute.MyFriends, {id: user?.id})}
            aria-label="Друзья"
            end
          >
            <svg width="22" height="16" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </NavLink>
        </li>
        <li className="main-nav__item main-nav__item--notifications">
          <a className="main-nav__link" href='#' aria-label="Уведомления">
            <svg width="14" height="18" aria-hidden="true">
              <use xlinkHref="#icon-notification"></use>
            </svg>
          </a>
          <Notification
            notifications={notifications}
            isConfirmed={false}
            onDeleteClick={onDeleteClick}
          />
        </li>
      </ul>
    </nav>
  );
};
