import {FileUpload, Questionnaire} from '@1770169-fitfriends/types';
import {FitnessLevel, TrainingTime, Exercise, Prisma} from '@1770169-fitfriends/models';
import {Entity} from '@1770169-fitfriends/core';

export class QuestionnaireEntity implements Questionnaire, Entity<string> {
  public id?: string;
  public fitnessLevel!: FitnessLevel;
  public trainingTime?: null | TrainingTime;
  public exercises!: Exercise[];
  public userId!: string;
  public caloriesLose?: null | number;
  public caloriesWaste?: null | number;
  public qualificationIds?: string[];
  public qualifications?: FileUpload[];
  public experience?: null | string;
  public isPersonal?: null | boolean;

  constructor(questionnaire: Questionnaire) {
    this.populate(questionnaire);
  }

  static fromObject(questionnaire: Questionnaire) {
    return new QuestionnaireEntity(questionnaire);
  }

  public populate(questionnaire: Questionnaire) {
    this.id = questionnaire.id;
    this.fitnessLevel = questionnaire.fitnessLevel;
    this.trainingTime = questionnaire.trainingTime;
    this.exercises = questionnaire.exercises;
    this.userId = questionnaire.userId;
    this.caloriesLose = questionnaire.caloriesLose;
    this.caloriesWaste = questionnaire.caloriesWaste;
    this.qualificationIds = questionnaire.qualificationIds;
    this.qualifications = questionnaire.qualifications;
    this.experience = questionnaire.experience;
    this.isPersonal = questionnaire.isPersonal;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      fitnessLevel: this.fitnessLevel,
      trainingTime: this.trainingTime,
      exercises: this.exercises,
      userId: this.userId,
      caloriesLose: this.caloriesLose,
      caloriesWaste: this.caloriesWaste,
      qualificationIds: this.qualificationIds,
      qualifications: this.qualifications,
      experience: this.experience,
      isPersonal: this.isPersonal
    };
  }

  public toPrismaObject() {
    return {
      fitnessLevel: this.fitnessLevel,
      exercises: this.exercises,
      userId: this.userId,
      trainingTime: this.trainingTime ?? Prisma.skip,
      qualificationIds: this.qualificationIds ?? Prisma.skip,
      caloriesLose: this.caloriesLose ?? Prisma.skip,
      caloriesWaste: this.caloriesWaste ?? Prisma.skip,
      experience: this.experience ?? Prisma.skip,
      isPersonal: this.isPersonal ?? Prisma.skip
    };
  }
}
