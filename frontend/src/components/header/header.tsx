import { Link, useLocation } from 'react-router-dom';

import { AppRoute } from '../../lib/shared/types';
import { Search } from '../search';
import { Navigation } from '../navigation';

export const Header = () => {
  const nav = useLocation();

  return (
    <header className="header">
      <div className="container">
        {
          nav.pathname !== '/' ?
            <Link className="header__logo" to={ AppRoute.Home } aria-label="Переход на главную">
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
        <Navigation />
        <Search
          foundItems={
            [{
              id: crypto.randomUUID(),
              title: 'Бокс'
            }]
          }
          isActive={ false }
        />
      </div>
    </header>
  );
};
