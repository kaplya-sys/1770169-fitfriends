import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {BaseMongoRepository} from '@1770169-guitar/core';

import {FilesEntity} from './files.entity';
import {FilesModel} from './files.model';

@Injectable()
export class FilesRepository extends BaseMongoRepository<FilesEntity, FilesModel> {
  constructor(
    @InjectModel(FilesModel.name) fileModel: Model<FilesModel>
  ) {
    super(fileModel, FilesEntity.fromObject);
  }
}
