import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';

import {CreateFeedbackDto, CreateTrainingDTO, UpdateTrainingDTO} from '@1770169-fitfriends/dto';
import {TrainingsQuery} from '@1770169-fitfriends/query';
import {
  FieldName,
  FileRecord,
  Pagination,
  RangeFilters,
  RequestFiles,
  TokenPayload
} from '@1770169-fitfriends/types';
import {Role} from '@1770169-fitfriends/models';
import {createMessage, getRandomElement, isKeyOfEntity} from '@1770169-fitfriends/helpers';

import {TrainingRepository} from './training.repository';
import {TrainingEntity} from './training.entity';
import {FilesService} from '../files/files.service';
import {
  AVERAGE_ERROR_MESSAGE,
  BACKGROUND_SUBDIRECTORY,
  FEEDBACK_ERROR_MESSAGE,
  NOT_FOUND_BY_ID_MESSAGE,
  SPECIAL_TRAINING_COUNT,
  TRAINING_ERROR_MESSAGE,
  UPDATE_TRAINING_ERROR_MESSAGE
} from './training.constant';
import {FeedbackEntity} from '../feedback/feedback.entity';
import {FeedbackRepository} from '../feedback/feedback.repository';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class TrainingService {
  constructor (
    private readonly trainingRepository: TrainingRepository,
    private readonly filesService: FilesService,
    private readonly authService: AuthService,
    private readonly feedbackRepository: FeedbackRepository
  ) {}

  public async createTraining({sub, name, role}: TokenPayload, dto: CreateTrainingDTO, file: RequestFiles): Promise<TrainingEntity> {
    if (role !== Role.coach) {
      throw new BadRequestException(TRAINING_ERROR_MESSAGE);
    }
    const newFiles = await this.filesService.saveFiles(file);
    const backgrounds = await this.filesService.getByFieldName(FieldName.Background);
    const trainingBackgrounds = backgrounds
      .filter((background) => background !== null && background.subDirectory.includes(BACKGROUND_SUBDIRECTORY));
    const background = getRandomElement(trainingBackgrounds);
    const trainingEntity = new TrainingEntity({
      ...dto,
      videoId: newFiles[0].id as string,
      backgroundId: background?.id as string,
      coachId: sub,
      coachName: name,
      specialOffer: false
    });
    const newTraining = await this.trainingRepository.save(trainingEntity);
    newTraining.background = background?.toObject();
    newTraining.video = newFiles[0].toObject();

    return newTraining;
  }

  public async updateTraining(id: string, dto: UpdateTrainingDTO): Promise<TrainingEntity> {
    const existTraining = await this.trainingRepository.findById(id);

    if(!existTraining) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && isKeyOfEntity(key, TrainingEntity) && existTraining[key] !== value) {
        existTraining[key] = value as never; //change
        hasChanges = true;
      }
    }
    const {video, background} = await this.getFiles(existTraining.videoId, existTraining.backgroundId);

    if (!hasChanges) {
      existTraining.video = video;
      existTraining.background = background;

      return existTraining;
    }
    const updatedTraining = await this.trainingRepository.update(id, existTraining);

    if (!updatedTraining) {
      throw new InternalServerErrorException(UPDATE_TRAINING_ERROR_MESSAGE);
    }
    updatedTraining.video = video;
    updatedTraining.background = background;

    return updatedTraining;
  }

  public async getTrainingById(id: string): Promise<TrainingEntity> {
    const existTraining = await this.trainingRepository.findById(id);

    if (!existTraining) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
    const {video, background} = await this.getFiles(existTraining.videoId, existTraining.backgroundId);
    existTraining.background = background;
    existTraining.video = video;

    return existTraining;
  }

  public async getTrainings(query?: TrainingsQuery): Promise<Pagination<TrainingEntity>> {
    const trainings = await this.trainingRepository.find(query);
    const entities = await Promise.all(
      trainings.entities.map(async (entity) => {
        const {video, background} = await this.getFiles(entity.videoId, entity.backgroundId);
        entity.background = background;
        entity.video = video;

        return entity;
      })
    );
    trainings.entities = entities;

    return trainings;
  }

  public async getRecommendedTrainings(userId: string): Promise<(TrainingEntity)[]> {
    const existUser = await this.authService.getUserById(userId);

    if (existUser.role !== Role.user) {
      return [];
    }

    if (existUser.questionnaire && existUser.questionnaire.caloriesWaste && existUser.questionnaire.trainingTime) {
      const recommendedByType = await this.trainingRepository.findRecommended({
        type: existUser.questionnaire.exercises
      });
      const recommendedByLevel = await this.trainingRepository.findRecommended({
        level: existUser.questionnaire.fitnessLevel
      });
      const recommendedByCalories = await this.trainingRepository.findRecommended({
        calories: existUser.questionnaire.caloriesWaste
      });
      const recommendedByTrainingTime = await this.trainingRepository.findRecommended({
        trainingTime: existUser.questionnaire.trainingTime
      });
      const trainings = [...recommendedByType, ...recommendedByLevel, ...recommendedByCalories, ...recommendedByTrainingTime];

      if (!trainings.length) {
        return [];
      }
      const frequencyMap = new Map<string, number>();
      const trainingMap = new Map<string, TrainingEntity>();

      trainings.forEach((training) => {
        if (training?.id) {
          frequencyMap.set(training.id, (frequencyMap.get(training.id) || 0) + 1);

          if (!trainingMap.has(training.id)) {
            trainingMap.set(training.id, training);
          }
        }
      });
      const sortedEntries = [...frequencyMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, SPECIAL_TRAINING_COUNT);

      const sortedTrainings = await Promise.all(sortedEntries.map(async ([id]) => {
        const training = trainingMap.get(id) as TrainingEntity;
        const {video, background} = await this.getFiles(training.videoId, training.backgroundId);
        training.background = background;
        training.video = video;

        return training;
      }));

      return sortedTrainings;
    }

    return [];
  }

  public async deleteTrainingById(id: string): Promise<void> {
    const existTraining = await this.trainingRepository.findById(id);

    if (!existTraining) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    await this.trainingRepository.delete(id);
  }

  public async getPriceAndCaloriesRange(): Promise<RangeFilters> {
    return this.trainingRepository.getRange();
  }

  public async createFeedback(id: string, {sub, role}: TokenPayload, dto: CreateFeedbackDto): Promise<FeedbackEntity> {
    if (role !== Role.user) {
      throw new BadRequestException(FEEDBACK_ERROR_MESSAGE);
    }
    const existTraining = await this.trainingRepository.findById(id);

    if (!existTraining) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
    const feedbackEntity = new FeedbackEntity({
      ...dto,
      authorId: sub,
      trainingId: id
    });
    const newFeedback = await this.feedbackRepository.save(feedbackEntity);
    const average = await this.feedbackRepository.averageAssessment(id);

    if (!average._avg.assessment) {
      throw new InternalServerErrorException(AVERAGE_ERROR_MESSAGE);
    }
    existTraining.rating = Math.round(average._avg.assessment);
    await this.trainingRepository.update(id, existTraining);

    return newFeedback;
  }

  public async getFeedbacksByTrainingId(id: string): Promise<FeedbackEntity[]> {
    const feedbacks = await this.feedbackRepository.find(id);
    const filteredFeedbacks = await Promise.all(
      feedbacks
        .filter((feedback) => feedback !== null)
        .map(async (feedback) => {
          if (feedback.author) {
            const avatar = await this.filesService.getFile(feedback.author.avatarId as string);
            feedback.author.avatar = avatar.toObject();
          }

          return feedback;
        })
    );

    return filteredFeedbacks;
  }

  private async getFiles(videoId: string, backgroundId: string) {
    const file: Pick<FileRecord, 'video' | 'background'> = {};
    file.video = (await this.filesService.getFile(videoId)).toObject();
    file.background = (await this.filesService.getFile(backgroundId)).toObject();

    return file;
  }
}
