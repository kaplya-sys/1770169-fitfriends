import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';

import {CreateTrainingDTO, UpdateTrainingDTO} from '@1770169-fitfriends/dto';
import {TrainingsQuery} from '@1770169-fitfriends/query';
import {FieldName, Pagination, RequestFiles, TokenPayload} from '@1770169-fitfriends/types';

import {TrainingRepository} from './training.repository';
import {TrainingEntity} from './training.entity';
import {FilesService} from '../files/files.service';
import {createMessage, getRandomElement} from '@1770169-fitfriends/helpers';
import {NOT_FOUND_BY_ID_MESSAGE, SERVER_ERROR_MESSAGE} from './training.constant';

@Injectable()
export class TrainingService {
  constructor (
    private readonly trainingRepository: TrainingRepository,
    private readonly fileService: FilesService
  ) {}

  public async createTraining({sub, name}: TokenPayload, dto: CreateTrainingDTO, file: RequestFiles): Promise<TrainingEntity> {
    const newFile = await this.fileService.saveFile(file);
    const backgrounds = await this.fileService.getByFieldName();
    const catalog = backgrounds.filter((background) => background?.catalog === FieldName.Background);
    const newProduct = new TrainingEntity({
      ...dto,
      videoId: newFile?.id as string,
      backgroundId: getRandomElement(catalog)?.id as string,
      coachId: sub,
      coachName: name,
      specialOffer: false
    });

    return this.trainingRepository.save(newProduct);
  }

  public async updateTraining(id: string, dto: UpdateTrainingDTO): Promise<TrainingEntity> {
    const existsProduct = await this.trainingRepository.findById(id);

    if(!existsProduct) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (existsProduct) {
        if (value !== undefined && existsProduct[key as keyof TrainingEntity] !== value) {
        existsProduct[key as keyof TrainingEntity] = value;
        hasChanges = true;
        }
      }
    }

    if (!hasChanges) {
      return existsProduct;
    }
    const updatedTraining = await this.trainingRepository.update(id, existsProduct);

    if (!updatedTraining) {
      throw new InternalServerErrorException(SERVER_ERROR_MESSAGE);
    }

    return updatedTraining;
  }

  public async getTrainingById(id: string): Promise<TrainingEntity> {
    const result = await this.trainingRepository.findById(id);

    if(!result) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
    const {video} = await this.fileService.getFile(result.videoId);
    const background = await this.fileService.getFile(result.backgroundId);

    return Object.assign(result, {
      video: video?.path,
      background
    });
  }

  public async getTrainings(query?: TrainingsQuery): Promise<Pagination<TrainingEntity>> {
    const result = await this.trainingRepository.find(query);
    const trainings = await Promise.all(
      result.entities.map(async (training) => {
        const {video} = await this.fileService.getFile(training.videoId);
        const background = await this.fileService.getFile(training.backgroundId);

        return Object.assign(training, {
          video: video?.path,
          background
        });
      })
    );

    return Object.assign(result, {entities: trainings});
  }

  public async deleteTrainingById(id: string): Promise<void> {
    this.trainingRepository.delete(id);
  }
}
