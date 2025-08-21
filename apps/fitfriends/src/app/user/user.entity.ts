import {genSaltSync, hashSync, compareSync} from 'bcrypt';

import {ExtendUser, FileUpload, Questionnaire} from '@1770169-fitfriends/types';
import {Location, Gender, Role, Prisma} from '@1770169-fitfriends/models';
import {Entity} from '@1770169-fitfriends/core';

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
  public location!: Location;
  public role!: Role;
  public backgroundIds!: string[];
  public backgrounds?: FileUpload[];
  public isReady?: boolean;
  public createdAt?: Date;
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
    this.location = user.location;
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
      location: this.location,
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
      avatarId: this.avatarId ?? Prisma.skip,
      gender: this.gender,
      birthday: this.birthday ?? Prisma.skip,
      description: this.description ?? Prisma.skip,
      location: this.location,
      role: this.role,
      backgroundIds: this.backgroundIds,
      isReady: this.isReady ?? Prisma.skip,
      avatar: this.avatar ?? Prisma.skip
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

  static fromObject(user: ExtendUser) {
    return new UserEntity(user);
  }
}
