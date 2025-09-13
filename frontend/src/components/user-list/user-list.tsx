import classNames from 'classnames';

import {UserType} from '../../libs/shared/types';
import {UserCard} from '../user-card';

type UserListPropsType = {
  className: string;
  users: UserType[];
  isWithSlider?: boolean;
}

export const UserList = ({className, users, isWithSlider = false}: UserListPropsType) => (
  <ul className={classNames(`${className}__list`, {'swiper-wrapper': isWithSlider})}>
    {users.map((user) => (
      <UserCard
        key={user.id}
        className={classNames(`${className}__item`, {'swiper-slide': isWithSlider})}
        user={user}
      />
    ))}
  </ul>
);
