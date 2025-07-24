import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { AppRoute } from '../../lib/shared/types';
import { Notification } from '../notification';

export const Navigation = () => (
  <nav className="main-nav">
    <ul className="main-nav__list">
      <li className="main-nav__item">
        <NavLink
          className={ ({ isActive }) => classNames('main-nav__link', { 'is-active': isActive }) }
          to={ AppRoute.Home }
          aria-label="На главную"
        >
          <svg width="18" height="18" aria-hidden="true">
            <use xlinkHref="#icon-home"></use>
          </svg>
        </NavLink>
      </li>
      <li className="main-nav__item">
        <NavLink
          className={ ({ isActive }) => classNames('main-nav__link', { 'is-active': isActive }) }
          to={AppRoute.PersonalAccount}
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
          to={ AppRoute.Friends }
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
          notifications={
            [{
              id: crypto.randomUUID(),
              text: 'Катерина пригласила вас на<>&nbsp;</>тренировку',
              date: '2020-04-02T08:02:17-05:00'
            }]
          }
          isConfirmed={ false }
        />
      </li>
    </ul>
  </nav>
);
