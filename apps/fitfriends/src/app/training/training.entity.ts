import {FitnessLevel, Exercise, TrainingTime, Gender, Prisma} from '@1770169-fitfriends/models';
import {Entity, FileUpload, Training} from '@1770169-fitfriends/types';

export class TrainingEntity implements Training, Entity<string> {
  public id?: string;
  public title!: string;
  public backgroundId!: string;
  public background?: FileUpload;
  public level!: FitnessLevel;
  public type!: Exercise;
  public trainingTime!: TrainingTime;
  public calories!: number;
  public gender!: Gender;
  public rating?: number;
  public description!: string;
  public price!: number;
  public videoId!: string;
  public video?: FileUpload;
  public coachName!: string;
  public specialOffer!: boolean;
  public createdAt?: Date;
  public coachId!: string;

  constructor(training: Training) {
    this.populate(training);
  }

  public populate(training: Training) {
      this.id = training.id;
      this.title = training.title;
      this.description = training.description;
      this.backgroundId = training.backgroundId;
      this.background = training.background;
      this.level = training.level;
      this.type = training.type;
      this.trainingTime = training.trainingTime;
      this.calories = training.calories;
      this.gender = training.gender;
      this.rating = training.rating;
      this.price = training.price;
      this.videoId = training.videoId;
      this.video = training.video;
      this.coachName = training.coachName;
      this.specialOffer = training.specialOffer;
      this.createdAt = training.createdAt;
      this.coachId = training.coachId;

      return this;
  }

  public toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      backgroundId: this.backgroundId,
      background: this.background,
      level: this.level,
      type: this.type,
      trainingTime: this.trainingTime,
      calories: this.calories,
      gender: this.gender,
      rating: this.rating,
      price: this.price,
      videoId: this.videoId,
      video: this.video,
      coachName: this.coachName,
      specialOffer: this.specialOffer,
      createdAt: this.createdAt,
      coachId: this.coachId
    };
  }

  public toPrismaObject() {
    return {
      title: this.title,
      description: this.description,
      backgroundId: this.backgroundId,
      level: this.level,
      type: this.type,
      trainingTime: this.trainingTime,
      calories: this.calories,
      gender: this.gender,
      price: this.price,
      videoId: this.videoId,
      coachName: this.coachName,
      specialOffer: this.specialOffer,
      coachId: this.coachId,
      rating: this.rating !== undefined ? this.rating : Prisma.skip
    };
  }

  static isOwnKey(key: string): boolean {
    const ownKeys = [
      'id',
      'title',
      'backgroundId',
      'background',
      'level',
      'type',
      'trainingTime',
      'calories',
      'gender',
      'rating',
      'description',
      'price',
      'videoId',
      'video',
      'coachName',
      'specialOffer',
      'createdAt',
      'coachId'
    ]

    return ownKeys.includes(key);
  }

  static fromObject(training: Training) {
    return new TrainingEntity(training);
  }
}
