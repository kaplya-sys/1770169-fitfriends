import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { SearchProps } from './search-props.type';

export const Search = ({ foundItems, isActive }: SearchProps) => (
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
          foundItems.map(({ id, title }) => (
            <li className={ classNames('search__item', { 'is-active': isActive }) } key={ id }>
              <Link className="search__link" to="#">{ title }</Link>
            </li>
          ))
        }
      </ul>
    </form>
  </div>
);
