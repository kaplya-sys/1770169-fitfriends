import {randomUUID} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';

import 'multer';
import dayjs from 'dayjs';
import {createReadStream, ensureDir} from 'fs-extra';
import {extension, lookup} from 'mime-types';
import {Response} from 'express';
import {Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';

import {FilesConfig} from '@1770169-fitfriends/config';
import {convertFileBuffer, createMessage, normalizePath} from '@1770169-fitfriends/helpers';
import {StoredFile, FieldName, RequestFiles, VideoFormat} from '@1770169-fitfriends/types';

import {FilesEntity} from './files.entity';
import {
  BACKGROUND,
  DATE_FORMAT,
  DEFAULT_UPLOAD_DIRECTORY,
  FILE_WRITE_ERROR,
  NOT_FOUND_BY_ID_MESSAGE
} from './files.constant';
import {FilesRepository} from './files.repository';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(
    @Inject(FilesConfig.KEY)
    public readonly filesOptions: ConfigType<typeof FilesConfig>,
    public readonly filesRepository: FilesRepository
  ) {}

  public async writeFile({mimetype, buffer}: Express.Multer.File, catalog: FieldName): Promise<StoredFile> {
    try {
      const [year, month] = dayjs().format(DATE_FORMAT).split(' ');
      const subDirectory = join(catalog, year, month);
      const uploadDirectory = join(this.filesOptions.uploadDirectory || DEFAULT_UPLOAD_DIRECTORY, subDirectory);
      const fileExtension = extension(mimetype);
      const filename = randomUUID();

      if (Object.values(VideoFormat).includes(mimetype as VideoFormat)) {
        const video = `${filename}.${fileExtension}`;
        const videoPath = normalizePath(join(uploadDirectory, video));
        await ensureDir(uploadDirectory);
        await writeFile(videoPath, new Uint8Array(buffer));

        return {
          catalog,
          subDirectory: normalizePath(subDirectory),
          video: {
            hashName: video,
            path: videoPath
          }
        };
      }
      const image = `${filename}.${fileExtension}`;
      const image2x = `${filename}@2x.${fileExtension}`;
      const imageWebp = `${filename}.webp`;
      const imageWebp2x = `${filename}@2x.webp`;
      const imagePath = normalizePath(join(uploadDirectory, image));
      const image2xPath = normalizePath(join(uploadDirectory, image2x));
      const imageWebpPath = normalizePath(join(uploadDirectory, imageWebp));
      const imageWebp2xPath = normalizePath(join(uploadDirectory, imageWebp2x));
      const fileBuffer = await convertFileBuffer(buffer);

      await ensureDir(uploadDirectory);
      await writeFile(imagePath, new Uint8Array(fileBuffer.file));
      await writeFile(image2xPath, new Uint8Array(fileBuffer.file2x));
      await writeFile(imageWebpPath, new Uint8Array(fileBuffer.fileWebp));
      await writeFile(imageWebp2xPath, new Uint8Array(fileBuffer.fileWebp2x));

      return {
        catalog,
        subDirectory: normalizePath(subDirectory),
        image: {
          hashName: image,
          path: imagePath
        },
        image2x: {
          hashName: image2x,
          path: image2xPath
        },
        imageWebp: {
          hashName: imageWebp,
          path: imageWebpPath
        },
        imageWebp2x: {
          hashName: imageWebp2x,
          path: imageWebp2xPath
        }
      };
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : err;
      this.logger.error(createMessage(FILE_WRITE_ERROR, [error]));
      throw new Error(createMessage(FILE_WRITE_ERROR, [error]));
    }
  }

  public async saveFile(file: RequestFiles): Promise<FilesEntity> {
    const [key, value] = Object.entries(file)[0];
    const recordedFile = await this.writeFile(value[0], key as FieldName);
    const filesEntity = FilesEntity.fromObject({
        catalog: recordedFile.catalog,
        subDirectory: recordedFile.subDirectory,
        originalName: value[0].originalname,
        size: value[0].size,
        mimetype: value[0].mimetype,
        image: recordedFile.image && {
          hashName: recordedFile.image.hashName,
          path: recordedFile.image.path
        },
        image2x: recordedFile.image2x && {
          hashName: recordedFile.image2x.hashName,
          path: recordedFile.image2x.path
        },
        imageWebp: recordedFile.imageWebp && {
          hashName: recordedFile.imageWebp.hashName,
          path: recordedFile.imageWebp.path
        },
        imageWebp2x: recordedFile.imageWebp2x && {
          hashName: recordedFile.imageWebp2x.hashName,
          path: recordedFile.imageWebp2x.path
        },
        video: recordedFile.video && {
          hashName: recordedFile.video.hashName,
          path: recordedFile.video.path
        }
      });

    return this.filesRepository.save(filesEntity);
  }

  public async getFile(id: string): Promise<FilesEntity> {
    const existFile = await this.filesRepository.findById(id);

    if(!existFile) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return existFile;
  }

  public async getByFieldName(catalog: FieldName): Promise<(FilesEntity | null)[]> {
    return this.filesRepository.getFilesByFieldName(catalog);
  }

  public async createBackgrounds(): Promise<void> {
    Object.keys(BACKGROUND).forEach((key) => BACKGROUND[key].forEach(async (image) => {
      const subDirectory = join(FieldName.Background, key.toLowerCase());
      const uploadDirectory = join(this.filesOptions.uploadDirectory || DEFAULT_UPLOAD_DIRECTORY, subDirectory);
      const [filename, fileExtension] = image.split('.')
      const image2x = `${filename}@2x.${fileExtension}`;
      const imageWebp = `${filename}.webp`;
      const imageWebp2x = `${filename}@2x.webp`;
      const imagePath = normalizePath(join(uploadDirectory, image));
      const image2xPath = normalizePath(join(uploadDirectory, image2x));
      const imageWebpPath = normalizePath(join(uploadDirectory, imageWebp));
      const imageWebp2xPath = normalizePath(join(uploadDirectory, imageWebp2x));
      const newEntity = new FilesEntity({
        catalog: FieldName.Background,
        subDirectory: normalizePath(subDirectory),
        originalName: image,
        size: 0,
        mimetype: lookup(fileExtension) as string,
        image: {
          hashName: image,
          path: imagePath
        },
        image2x: {
          hashName: image,
          path:image2xPath
        },
        imageWebp: {
          hashName: image,
          path: imageWebpPath
        },
        imageWebp2x: {
          hashName: image,
          path: imageWebp2xPath
        }
      });

      await this.filesRepository.save(newEntity);
    }))
  }

  public async streamVideo(id: string, res: Response, range?: string): Promise<void> {
    const existFile = await this.filesRepository.findById(id);

    if (!existFile) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : existFile.size - 1;
      const chunkSize = end - start + 1;

      const headers = {
      'Content-Range': `bytes ${start}-${end}/${existFile.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': existFile.mimetype,
      };

      res.writeHead(206, headers);
      const stream = createReadStream(existFile.video?.path as string, {start, end});
      stream.pipe(res);
    } else {
      const headers = {
      'Content-Length': existFile.size,
      'Content-Type': existFile.mimetype,
      };

      res.writeHead(200, headers);
      createReadStream(existFile.video?.path as string).pipe(res);
    }
  }
}
