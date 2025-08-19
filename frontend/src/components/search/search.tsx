import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {useAppSelector} from '../../hooks';
import {selectUserBalance} from '../../store';

export const Search = () => {
  const balance = useAppSelector(selectUserBalance);

  return (
    <div className="search">
      <form action="#" method="get">
        <label><span className="search__label">Поиск</span>
          <input type="search" name="search" />
          <svg className="search__icon" width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
        </label>
        <ul className="search__list">
          {
            balance.map((item) => (
              <li className={classNames('search__item', {'is-active': !!item.amount})} key={item.training.id}>
                <Link className="search__link" to="#">{item.training.title}</Link>
              </li>
            ))
          }
        </ul>
      </form>
    </div>
  );
};
