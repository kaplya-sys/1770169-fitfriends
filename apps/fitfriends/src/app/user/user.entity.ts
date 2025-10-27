import {genSaltSync, hashSync, compareSync} from 'bcrypt';

import {
  Entity,
  ExtendUser,
  FileUpload,
  MetroStation,
  Questionnaire
} from '@1770169-fitfriends/types';
import {Gender, Role, Prisma} from '@1770169-fitfriends/models';

import {SALT_ROUNDS} from './user.constant';

export class UserEntity implements ExtendUser, Entity<string> {
  public id?: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public avatarId?: null | string;
  public avatar?: FileUpload;
  public gender!: Gender;
  public birthday?: null | Date;
  public description?: null | string;
  public stationId!: string;
  public station?: MetroStation;
  public role!: Role;
  public backgroundIds!: string[];
  public backgrounds?: FileUpload[];
  public isReady?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  public questionnaire?: null | Questionnaire;

  constructor(user: ExtendUser) {
    this.populate(user);
  }

  public populate(user: ExtendUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.avatarId = user.avatarId;
    this.avatar = user.avatar;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.description = user.description;
    this.stationId = user.stationId;
    this.station = user.station;
    this.role = user.role;
    this.backgroundIds = user.backgroundIds;
    this.backgrounds = user.backgrounds;
    this.isReady = user.isReady;
    this.createdAt = user.createdAt;
    this.questionnaire = user.questionnaire;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      avatarId: this.avatarId,
      avatar: this.avatar,
      gender: this.gender,
      birthday: this.birthday,
      description: this.description,
      stationId: this.stationId,
      station: this.station,
      role: this.role,
      backgroundIds: this.backgroundIds,
      backgrounds: this.backgrounds,
      isReady: this.isReady,
      createdAt: this.createdAt,
      questionnaire: this.questionnaire
    };
  }

  public toPrismaObject() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      gender: this.gender,
      stationId: this.stationId,
      role: this.role,
      backgroundIds: this.backgroundIds,
      avatarId: this.avatarId !== undefined ? this.avatarId : Prisma.skip,
      birthday: this.birthday !== undefined ? this.birthday : Prisma.skip,
      description: this.description !== undefined ? this.description : Prisma.skip,
      isReady: this.isReady !== undefined ? this.isReady: Prisma.skip
    };
  }

  public async setPassword(password: string) {
    const salt = genSaltSync(SALT_ROUNDS);
    this.password = hashSync(password, salt);

    return this;
  }

  public async comparePassword(password: string) {
    return compareSync(password, this.password);
  }

  static isOwnKey(key: string): boolean {
    const ownKeys = [
      'id',
      'avatar',
      'avatarId',
      'backgroundIds',
      'backgrounds',
      'birthday',
      'createdAt',
      'description',
      'email',
      'gender',
      'isReady',
      'stationId',
      'station',
      'name',
      'password',
      'questionnaire',
      'role'
    ]
    return ownKeys.includes(key);
  }

  static fromObject(user: ExtendUser) {
    return new UserEntity(user);
  }
}
