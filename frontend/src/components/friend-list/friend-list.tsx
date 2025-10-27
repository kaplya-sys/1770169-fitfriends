import {
  AuthenticatedUserType,
  UserApplicationStatusType,
  UserApplicationType,
  UserType
} from '../../libs/shared/types';
import {FriendCard} from '../friend-card';

type FriendsListPropsType = {
  users: UserType[];
  authenticatedUser: AuthenticatedUserType;
  userApplications: UserApplicationType[];
  onInviteClick: (userId: string) => void;
  onAcceptOrRejectClick: (applicationId: string, status: UserApplicationStatusType) => void;
}

export const FriendsList = ({
  users,
  authenticatedUser,
  userApplications,
  onInviteClick,
  onAcceptOrRejectClick
}: FriendsListPropsType) => (
  <ul className="friends-list__list">
    {users.map((user) => (
      <FriendCard
        key={user.id}
        user={user}
        authenticatedUser={authenticatedUser}
        userApplications={userApplications}
        onInviteClick={onInviteClick}
        onAcceptOrRejectClick={onAcceptOrRejectClick}
      />
    ))}
  </ul>
);
