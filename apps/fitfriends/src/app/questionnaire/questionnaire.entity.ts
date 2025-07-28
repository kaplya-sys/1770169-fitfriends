import {Questionnaire} from '@1770169-fitfriends/types';
import {FitnessLevel, TrainingTime, Exercise} from '@1770169-fitfriends/models';
import {Entity} from '@1770169-fitfriends/core';

export class QuestionnaireEntity implements Questionnaire, Entity<string> {
  public id?: string;
  public fitnessLevel!: FitnessLevel;
  public trainingTime?: TrainingTime;
  public exercise!: Exercise[];
  public calorieLose?: number;
  public calorieWaste?: number;
  public qualifications?: string[];
  public experience?: string;
  public isPersonal?: boolean;

  constructor(questionnaire: Questionnaire) {
    this.populate(questionnaire)
  }

  static fromObject(questionnaire: Questionnaire) {
    return new QuestionnaireEntity(questionnaire);
  }

  public populate(questionnaire: Questionnaire) {
    this.id = questionnaire.id,
    this.fitnessLevel = questionnaire.fitnessLevel,
    this.trainingTime = questionnaire.trainingTime,
    this.exercise = questionnaire.exercise,
    this.calorieLose = questionnaire.calorieLose,
    this.calorieWaste = questionnaire.calorieWaste,
    this.qualifications = questionnaire.qualifications,
    this.experience = questionnaire.experience,
    this.isPersonal = questionnaire.isPersonal
  }

  public toObject() {
    return {
      id: this.id,
      fitnessLevel: this.fitnessLevel,
      trainingTime: this.trainingTime,
      exercise: this.exercise,
      calorieLose: this.calorieLose,
      calorieWaste: this.calorieWaste,
      qualifications: this.qualifications,
      experience: this.experience,
      isPersonal: this.isPersonal
    }
  }
}
