import {Injectable} from '@nestjs/common';

import {CreateTrainingDTO, UpdateTrainingDTO} from '@1770169-fitfriends/dto';
import { TrainingsQuery } from '@1770169-fitfriends/query';
import {RequestFiles} from '@1770169-fitfriends/types';

import {TrainingRepository} from './training.repository';
import {TrainingEntity} from './training.entity';
import {FilesService} from '../files/files.service';
import {FilesEntity} from '../files/files.entity';

@Injectable()
export class TrainingService {
  constructor (
    private readonly trainingRepository: TrainingRepository,
    private readonly fileService: FilesService
  ) {}

  public async createTraining(dto: CreateTrainingDTO, file: RequestFiles) {
    const newFile = await this.fileService.saveFile(file);
    const newProduct = new TrainingEntity({...dto, video: newFile.id});

    return this.trainingRepository.save(newProduct);
  }

  public async updateTraining(id: string, dto: UpdateTrainingDTO, file?: RequestFiles) {
    const existsProduct = await this.trainingRepository.findById(id);
    let hasChanges = false;
    let newFile: FilesEntity;

    for (const [key, value] of Object.entries(dto)) {
      if (existsProduct) {
        if (value !== undefined && existsProduct[key] !== value) {
        existsProduct[key] = value;
        hasChanges = true;
      }
      }
    }

    if (file) {
      newFile = await this.fileService.saveFile(file);
      existsProduct.image = newFile.id;
      hasChanges = true;
    }

    if (!hasChanges) {
      return existsProduct;
    }

    return this.trainingRepository.update(id, existsProduct);
  }

  public async getTrainingById(id: string) {
    const result = await this.trainingRepository.findById(id)

    return result;
  }

  public async getTrainings(query?: TrainingsQuery) {
    const result = await this.trainingRepository.find(query);
    const products = await Promise.all(
      result.entities.map(async (product) => {
        const image = await this.fileService.getFile(product.image as string);

        return Object.assign(product, {
          video: image.image
        })
      })
    )

    return Object.assign(result, {entities: products});
  }

  public async deleteTrainingById(id: string) {
    return this.trainingRepository.delete(id);
  }
}
