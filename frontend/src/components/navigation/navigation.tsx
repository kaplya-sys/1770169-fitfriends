import {NavLink} from 'react-router-dom';
import classNames from 'classnames';

import {AppRoute} from '../../libs/shared/types';
import {Notification} from '../notification';
import {mockNotifications} from '../../../mock-data';
import {useAppSelector} from '../../hooks';
import {selectAuthenticatedUser} from '../../store';
import {getRouteWithParam} from '../../libs/shared/helpers';


export const Navigation = () => {
  const user = useAppSelector(selectAuthenticatedUser);

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <NavLink
            className={({isActive}) => classNames('main-nav__link', {'is-active': isActive})}
            to={AppRoute.Home}
            aria-label="На главную"
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-home"></use>
            </svg>
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink
            className={({isActive}) => classNames('main-nav__link', {'is-active': isActive})}
            to={getRouteWithParam(AppRoute.PersonalAccount, {id: user?.sub})}
            aria-label="Личный кабинет"
          >
            <svg width="16" height="18" aria-hidden="true">
              <use xlinkHref="#icon-user"></use>
            </svg>
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink
            className="main-nav__link"
            to={getRouteWithParam(AppRoute.MyFriends, {id: user?.sub})}
            aria-label="Друзья"
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
            notifications={mockNotifications}
            isConfirmed={ false }
          />
        </li>
      </ul>
    </nav>
  );
};
