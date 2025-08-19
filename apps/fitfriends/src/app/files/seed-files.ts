/*import {join} from 'node:path';

import {lookup} from 'mime-types';

import {normalizePath} from '@1770169-fitfriends/helpers';
import {FieldName} from '@1770169-fitfriends/types';

import {FilesEntity} from './files.entity';
import {FilesRepository} from './files.repository';*/

import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {FilesModel} from './files.model';
import {Injectable} from '@nestjs/common';

Injectable()
export class Service {
  constructor(
    @InjectModel(FilesModel.name)
    protected readonly fileModel: Model<FilesModel>
  ) {}

  public test() {
    this.fileModel.create();
  }
}

/*const BACKGROUND: Record<string, string[]> = {
  USER: ['user-card-photo1.jpg', 'user-card-photo2.jpg'],
  COACH: ['user-coach-photo1.jpg', 'user-coach-photo2.jpg'],
  VIDEO: ['test-video.mp4'],
  QUALIFICATIONS: ['certificate-1.jpg','certificate-2.jpg'],
  TRAINING: [
    'training-01.jpg',
    'training-02.jpg',
    'training-03.jpg',
    'training-04.jpg',
    'training-05.jpg',
    'training-06.jpg',
    'training-07.jpg',
    'training-08.jpg',
    'training-09.jpg',
    'training-10.jpg',
    'training-11.jpg',
    'training-12.jpg'
  ]
};

const uuids = [
  '68a30a546cb39008b0015aa0',
  '68a30a546cb39008b0015aa1',
  '68a30a546cb39008b0015aa2',
  '68a30a546cb39008b0015aa3',
  '68a30a546cb39008b0015aa4',
  '68a30a546cb39008b0015aa5',
  '68a30a546cb39008b0015aa6',
  '68a30a546cb39008b0015aa7',
  '68a30a546cb39008b0015aa8',
  '68a30a546cb39008b0015aa9',
  '68a30a546cb39008b0015aaa',
  '68a30a546cb39008b0015aab',
  '68a30a546cb39008b0015aac',
  '68a30a546cb39008b0015aad',
  '68a30a546cb39008b0015aae',
  '68a30a546cb39008b0015aaf',
  '68a30a546cb39008b0015ab0',
  '68a30a546cb39008b0015ab1',
  '68a30a546cb39008b0015ab2'
]


const seedDB = () => {
  Object.keys(BACKGROUND).forEach((key) => BACKGROUND[key].forEach(async (image, index) => {
    const subDirectory = join(FieldName.Background, key.toLowerCase());
    const [filename, fileExtension] = image.split('.');
    const image2x = `${filename}@2x.${fileExtension}`;
    const imageWebp = `${filename}.webp`;
    const imageWebp2x = `${filename}@2x.webp`;
    const newEntity = new FilesEntity({
      id: uuids[index],
      catalog: FieldName.Background,
      subDirectory: normalizePath(subDirectory),
      originalName: image,
      size: 0,
      mimetype: lookup(fileExtension) as string
    });

    if (key === FieldName.Video) {
      const video = `${filename}.${fileExtension}`;
      newEntity.video = {
        hashName: video,
        path: normalizePath(join(subDirectory, video))
      }

      return await filesRepository.save(newEntity);
    }

    newEntity.image = {
      hashName: image,
      path: normalizePath(join(subDirectory, image))
    };
    newEntity.image2x = {
      hashName: image,
      path: normalizePath(join(subDirectory, image2x))
    };
    newEntity.imageWebp = {
      hashName: image,
      path: normalizePath(join(subDirectory, imageWebp))
    },
    newEntity.imageWebp2x = {
      hashName: image,
      path: normalizePath(join(subDirectory, imageWebp2x))
    };

    return await filesRepository.save(newEntity);
  }));
}

  seedDB()
*/
