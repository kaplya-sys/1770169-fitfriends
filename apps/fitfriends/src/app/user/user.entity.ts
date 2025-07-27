import {genSaltSync, hashSync, compareSync} from 'bcrypt';
import {
  ExtendUser,
  Gender,
  Location,
  Questionnaire
} from '@1770169-fitfriends/types';
import {Exercise, FitnessLevel, Role, TrainingTime} from '@1770169-fitfriends/models';

import {Entity} from '@1770169-fitfriends/core';

import {SALT_ROUNDS} from './user.constant';

export class UserEntity implements ExtendUser, Partial<Questionnaire>, Entity<string> {
  public id?: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public avatar!: string;
  public gender!: Gender;
  public birthday?: Date;
  public description?: string;
  public location!: Location;
  public role!: Role;
  public background!: string;
  public isReady?: boolean;
  public createdAt?: Date;
  public fitnessLevel?: FitnessLevel;
  public trainingTime?: TrainingTime;
  public exercise?: Exercise[];
  public calorieLose?: number;
  public calorieWaste?: number;

  constructor(user: ExtendUser & Partial<Questionnaire>) {
    this.populate(user);
  }

  static fromObject(user: ExtendUser & Partial<Questionnaire>) {
    return new UserEntity(user);
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      avatar: this.avatar,
      gender: this.gender,
      birthday: this.birthday,
      description: this.description,
      location: this.location,
      role: this.role,
      background: this.background,
      isReady: this.isReady,
      createdAt: this.createdAt,
      fitnessLevel: this.fitnessLevel,
      trainingTime: this.trainingTime,
      exercise: this.exercise,
      calorieLose: this.calorieLose,
      calorieWaste: this.calorieWaste
    }
  }

  public populate(user: ExtendUser & Partial<Questionnaire>) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.avatar = user.avatar,
    this.gender = user.gender,
    this.birthday = user.birthday,
    this.description = user.description,
    this.location = user.location,
    this.role = user.role,
    this.background = user.background,
    this.isReady = user.isReady,
    this.createdAt = user.createdAt
    this.fitnessLevel = user.fitnessLevel,
    this.trainingTime = user.trainingTime,
    this.exercise = user.exercise,
    this.calorieLose = user.calorieLose,
    this.calorieWaste = user.calorieWaste
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
