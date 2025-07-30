import {Injectable, NotFoundException} from '@nestjs/common';

import {CreateTrainingDTO, UpdateTrainingDTO} from '@1770169-fitfriends/dto';
import {TrainingsQuery} from '@1770169-fitfriends/query';
import {FieldName, RequestFiles} from '@1770169-fitfriends/types';

import {TrainingRepository} from './training.repository';
import {TrainingEntity} from './training.entity';
import {FilesService} from '../files/files.service';
import {FilesEntity} from '../files/files.entity';
import {createMessage, getRandomElement} from '@1770169-fitfriends/helpers';
import {NOT_FOUND_BY_ID_MESSAGE} from './training.constant';

@Injectable()
export class TrainingService {
  constructor (
    private readonly trainingRepository: TrainingRepository,
    private readonly fileService: FilesService
  ) {}

  public async createTraining(id: string, name: string, dto: CreateTrainingDTO, file: RequestFiles) {
    const newFile = await this.fileService.saveFile(file);
    const backgrounds = await this.fileService.getByFieldName();

    const catalog = backgrounds.filter((background) => background?.catalog === FieldName.Background);
    const newProduct = new TrainingEntity({
      ...dto,
      video: newFile?.id as string,
      background: getRandomElement(catalog)?.id as string,
      coachId: id,
      coachName: name,
      specialOffer: false
    });

    return this.trainingRepository.save(newProduct);
  }

  public async updateTraining(id: string, dto: UpdateTrainingDTO, file?: RequestFiles) {
    const existsProduct = await this.trainingRepository.findById(id);

    if(!existsProduct) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    let hasChanges = false;
    let newFile: FilesEntity;

    for (const [key, value] of Object.entries(dto)) {
      if (existsProduct) {
        if (value !== undefined && existsProduct[key as keyof TrainingEntity] !== value) {
        existsProduct[key as keyof TrainingEntity] = value;
        hasChanges = true;
        }
      }
    }

    if (file) {
      newFile = await this.fileService.saveFile(file);
      existsProduct.video = newFile.id as string;
      hasChanges = true;
    }

    if (!hasChanges) {
      return existsProduct;
    }

    return this.trainingRepository.update(id, existsProduct);
  }

  public async getTrainingById(id: string) {
    const result = await this.trainingRepository.findById(id);

    return result;
  }

  public async getTrainings(query?: TrainingsQuery) {
    const result = await this.trainingRepository.find(query);
    const products = await Promise.all(
      result.entities.map(async (product) => {
        const image = await this.fileService.getFile(product.image as string);

        return Object.assign(product, {
          video: image.image
        });
      })
    );

    return Object.assign(result, {entities: products});
  }

  public async deleteTrainingById(id: string) {
    return this.trainingRepository.delete(id);
  }
}
