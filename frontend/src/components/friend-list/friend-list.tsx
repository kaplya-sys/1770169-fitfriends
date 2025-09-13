import {UserType} from '../../libs/shared/types';
import {FriendCard} from '../friend-card';

type FriendsListPropsType = {
  users: UserType[];
  joinTrainingStatus: boolean;
  personalTrainingStatus: boolean;
}

export const FriendsList = ({users, joinTrainingStatus, personalTrainingStatus}: FriendsListPropsType) => (
  <ul className="friends-list__list">
    {users.map((user) => (
      <FriendCard
        key={user.id}
        user={user}
        joinTrainingStatus={joinTrainingStatus}
        personalTrainingStatus={personalTrainingStatus}
      />
    ))}
  </ul>
);
