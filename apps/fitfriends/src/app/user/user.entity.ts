import {genSaltSync, hashSync, compareSync} from 'bcrypt';

import {ExtendUser} from '@1770169-fitfriends/types';
import {Location, Gender, Role} from '@1770169-fitfriends/models';
import {Entity} from '@1770169-fitfriends/core';

import {SALT_ROUNDS} from './user.constant';

export class UserEntity implements ExtendUser, Entity<string> {
  public id?: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public avatarId!: string;
  public gender!: Gender;
  public birthday?: Date;
  public description?: string;
  public location!: Location;
  public role!: Role;
  public backgroundIds!: string[];
  public isReady?: boolean;
  public createdAt?: Date;
  public questionnaireId?: string;

  constructor(user: ExtendUser) {
    this.populate(user);
  }

  static fromObject(user: ExtendUser) {
    return new UserEntity(user);
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      avatarId: this.avatarId,
      gender: this.gender,
      birthday: this.birthday,
      description: this.description,
      location: this.location,
      role: this.role,
      backgroundIds: this.backgroundIds,
      isReady: this.isReady,
      createdAt: this.createdAt,
      questionnaireId: this.questionnaireId
    };
  }

  public populate(user: ExtendUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.avatarId = user.avatarId;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.description = user.description;
    this.location = user.location;
    this.role = user.role;
    this.backgroundIds = user.backgroundIds;
    this.isReady = user.isReady;
    this.createdAt = user.createdAt;
    this.questionnaireId = user.questionnaireId;

    return this;
  }

  public async setPassword(password: string) {
    const salt = genSaltSync(SALT_ROUNDS);
    this.password = hashSync(password, salt);

    return this;
  }

  public async comparePassword(password: string) {
    return compareSync(password, this.password);
  }
}
