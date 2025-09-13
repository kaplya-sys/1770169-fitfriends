import {Prisma} from '@1770169-fitfriends/models';
import {Entity, Friend, User} from '@1770169-fitfriends/types';

export class FriendEntity implements Friend, Entity<string> {
  public id?: string;
  public userId!: string;
  public user?: User;
  public friendId!: string;
  public friend?: User;
  public isJoinTraining?: null | boolean;
  public isPersonalTraining?: null | boolean;

  constructor(friend: Friend) {
    this.populate(friend);
  }

  public populate(data: Friend) {
    this.id = data.id;
    this.userId = data.userId;
    this.user = data.user;
    this.friendId = data.friendId;
    this.friend = data.friend;
    this.isJoinTraining = data.isJoinTraining;
    this.isPersonalTraining = data.isPersonalTraining;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      userId: this.userId,
      user: this.user,
      friendId: this.friendId,
      friend: this.friend,
      isJoinTraining: this.isJoinTraining,
      isPersonalTraining: this.isPersonalTraining
    };
  }

  public toPrismaObject() {
    return {
      userId: this.userId,
      friendId: this.friendId,
      isJoinTraining: this.isJoinTraining !== undefined ? this.isJoinTraining : Prisma.skip,
      isPersonalTraining: this.isPersonalTraining !== undefined ? this.isPersonalTraining : Prisma.skip
    };
  }

  static fromObject(friend: Friend) {
    return new FriendEntity(friend);
  }
}
