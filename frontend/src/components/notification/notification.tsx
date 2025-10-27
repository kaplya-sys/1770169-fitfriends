import {MouseEvent} from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

import 'dayjs/locale/ru';

import {ATTRIBUTE_FORMAT, DATE_VIEW_FORMAT} from '../../libs/shared/constants';
import {NotificationType} from '../../libs/shared/types';

dayjs.locale('ru');

type NotificationProps = {
  notifications: NotificationType[];
  isConfirmed: boolean;
  onDeleteClick: (evt: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const Notification = ({notifications, isConfirmed, onDeleteClick}: NotificationProps) => (
  <div className="main-nav__dropdown">
    <p className="main-nav__label">Оповещения</p>
    <ul className="main-nav__sublist">
      {
        notifications.map(({id, text, date}) => (
          <li className="main-nav__subitem" key={id}>
            <a
              className={classNames('notification', {'is-active': !isConfirmed})}
              href='#'
              onClick={(evt) => onDeleteClick(evt, id)}
            >
              <p className="notification__text">{text}</p>
              <time
                className="notification__time"
                dateTime={dayjs(date).format(ATTRIBUTE_FORMAT)}
              >
                {dayjs(date).format(DATE_VIEW_FORMAT)}
              </time>
            </a>
          </li>
        ))
      }
    </ul>
  </div>
);
