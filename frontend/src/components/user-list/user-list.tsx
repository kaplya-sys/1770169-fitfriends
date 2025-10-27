import {UserType} from '../../libs/shared/types';
import {UserCard} from '../user-card';

type UserListPropsType = {
  className: string;
  users: UserType[];
  isDark?: boolean;
}

export const UserList = ({className, users, isDark}: UserListPropsType) => (
  <ul className={`${className}__list`}>
    {users.map((user) => (
      <UserCard
        key={user.id}
        className={`${className}__item`}
        user={user}
        isDark={isDark}
      />
    ))}
  </ul>
);
