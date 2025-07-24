import {genSaltSync, hashSync, compareSync} from 'bcrypt';
import {Role} from '@1770169-guitar/models';

import {Entity} from '@1770169-guitar/core';
import {ExtendUser} from '@1770169-guitar/types';

import {SALT_ROUNDS} from './user.constant';

export class UserEntity implements ExtendUser, Entity<string> {
  public id?: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role?: Role;

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
      role: this.role,
    }
  }

  public populate(user: ExtendUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
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
