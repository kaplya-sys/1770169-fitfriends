import dayjs from 'dayjs';
import classNames from 'classnames';
import 'dayjs/locale/ru'
import { Link } from 'react-router-dom';

dayjs.locale('ru')

import { NotificationProps } from './notification-props.type';
import { ATTRIBUTE_FORMAT, DATE_VIEW_FORMAT } from '../../lib/shared/constants';

export const Notification = ({ notifications, isConfirmed }: NotificationProps) => (
  <div className="main-nav__dropdown">
    <p className="main-nav__label">Оповещения</p>
    <ul className="main-nav__sublist">
      {
        notifications.map(({ id, text, date }) => (
          <li className="main-nav__subitem" key={ id }>
            <Link className={ classNames('notification', { 'is-active': !isConfirmed }) } to=''>
              <p className="notification__text">{ text }</p>
              <time
                className="notification__time"
                dateTime={ dayjs(date).format(ATTRIBUTE_FORMAT) }
              >
                { dayjs(date).format(DATE_VIEW_FORMAT) }
              </time>
            </Link>
          </li>
        ))
      }
    </ul>
  </div>
);
