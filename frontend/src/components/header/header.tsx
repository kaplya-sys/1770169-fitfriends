import {MouseEvent, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';

import {Navigation} from '../navigation';
import {Search} from '../search';
import {AppRoute, AuthorizationStatus} from '../../libs/shared/types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  deleteNotificationAction,
  getNotificationsAction,
  logoutUserAction,
  selectAuthorizationStatus
} from '../../store';

export const Header = () => {
  const navigation = useLocation();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(getNotificationsAction());
    }
  }, [authorizationStatus, dispatch]);

  const handleLogoutClick = () => {
    dispatch(logoutUserAction());
  };
  const handleDeleteClick = (evt: MouseEvent<HTMLAnchorElement>, id: string) => {
    evt.preventDefault();
    dispatch(deleteNotificationAction({id}));
  };

  return (
    <header className="header">
      <div className="container">
        {
          navigation.pathname !== '/' ?
            <Link className="header__logo" to={AppRoute.Home} aria-label="Переход на главную">
              <svg width="187" height="70" aria-hidden="true">
                <use xlinkHref="#logo"></use>
              </svg>
            </Link> :
            <span className="header__logo">
              <svg width="187" height="70" aria-hidden="true">
                <use xlinkHref="#logo"></use>
              </svg>
            </span>
        }
        <Navigation onDeleteClick={handleDeleteClick}/>
        <Search/>
        <button className="btn-flat btn-flat--underlined header__logout-button" type='button' onClick={handleLogoutClick}>Выход</button>
      </div>
    </header>
  );
};
