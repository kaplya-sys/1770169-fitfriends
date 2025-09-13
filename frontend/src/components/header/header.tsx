import {Link, useLocation} from 'react-router-dom';

import {Navigation} from '../navigation';
import {Search} from '../search';
import {AppRoute} from '../../libs/shared/types';
import {useAppDispatch} from '../../hooks';
import {logoutUserAction} from '../../store';

export const Header = () => {
  const navigation = useLocation();
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutUserAction());
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
        <Navigation/>
        <Search/>
        <button className="btn-flat btn-flat--underlined header__logout-button" type='button' onClick={handleLogoutClick}>Выход</button>
      </div>
    </header>
  );
};
