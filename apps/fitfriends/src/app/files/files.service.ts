import {randomUUID} from 'node:crypto';
import {writeFile, unlink} from 'node:fs/promises';
import {join} from 'node:path';

import 'multer';
import dayjs from 'dayjs';
import {createReadStream, ensureDir} from 'fs-extra';
import {extension, lookup} from 'mime-types';
import {Response} from 'express';
import {Inject, Injectable, InternalServerErrorException, Logger, NotFoundException} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';

import {FilesConfig} from '@1770169-fitfriends/config';
import {convertFileBuffer, createMessage, normalizePath} from '@1770169-fitfriends/helpers';
import {StoredFile, FieldName, RequestFiles, VideoFormat, DocumentFormat} from '@1770169-fitfriends/types';

import {FilesEntity} from './files.entity';
import {
  BACKGROUND,
  DATE_FORMAT,
  DEFAULT_UPLOAD_DIRECTORY,
  DELETE_FILE_ERROR,
  WRITE_FILE_ERROR,
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
            path: normalizePath(join(subDirectory, video))
          }
        };
      }

      if (Object.values(DocumentFormat).includes(mimetype as DocumentFormat)) {
        const document = `${filename}.${fileExtension}`;
        const documentPath = normalizePath(join(uploadDirectory, document));
        await ensureDir(uploadDirectory);
        await writeFile(documentPath, new Uint8Array(buffer));

        return {
          catalog,
          subDirectory: normalizePath(subDirectory),
          document: {
            hashName: document,
            path: normalizePath(join(subDirectory, document))
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
          path: normalizePath(join(subDirectory, image))
        },
        image2x: {
          hashName: image2x,
          path: normalizePath(join(subDirectory, image2x))
        },
        imageWebp: {
          hashName: imageWebp,
          path: normalizePath(join(subDirectory, imageWebp))
        },
        imageWebp2x: {
          hashName: imageWebp2x,
          path: normalizePath(join(subDirectory, imageWebp2x))
        }
      };
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : err;
      this.logger.error(createMessage(WRITE_FILE_ERROR, [error]));
      throw new Error(createMessage(WRITE_FILE_ERROR, [error]));
    }
  }

  public async saveFiles(files: RequestFiles): Promise<FilesEntity[]> {
    const uploads: FilesEntity[] = [];

    for (const [key, value] of Object.entries(files)) {
      for (const file of value) {
      const recordedFile = await this.writeFile(file, key as FieldName);
      const filesEntity = FilesEntity.fromObject({
        catalog: recordedFile.catalog,
        subDirectory: recordedFile.subDirectory,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
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
        },
        document: recordedFile.document && {
          hashName: recordedFile.document.hashName,
          path: recordedFile.document.path
        }
      });
      const newFile = await this.filesRepository.save(filesEntity);
      uploads.push(newFile);
    }
  }

    return uploads;
  }

  public async createBackgrounds(): Promise<FilesEntity[]> {
    const backgrounds: FilesEntity[] = [];

    Object.keys(BACKGROUND)
      .forEach((key) => BACKGROUND[key]
      .forEach(async (image) => {
        const subDirectory = join(FieldName.Background, key.toLowerCase());
        const [filename, fileExtension] = image.split('.');
        const image2x = `${filename}@2x.${fileExtension}`;
        const imageWebp = `${filename}.webp`;
        const imageWebp2x = `${filename}@2x.webp`;
        const newEntity = new FilesEntity({
          catalog: FieldName.Background,
          subDirectory: normalizePath(subDirectory),
          originalName: image,
          size: 0,
          mimetype: lookup(fileExtension) as string,
          image: {
            hashName: image,
            path: normalizePath(join(subDirectory, image))
          },
          image2x: {
            hashName: image,
            path: normalizePath(join(subDirectory, image2x))
          },
          imageWebp: {
            hashName: image,
            path: normalizePath(join(subDirectory, imageWebp))
          },
          imageWebp2x: {
            hashName: image,
            path: normalizePath(join(subDirectory, imageWebp2x))
          }
      });
        const newBackground = await this.filesRepository.save(newEntity);
        backgrounds.push(newBackground);
    }));

    return backgrounds;
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

  public async updateFile(id: string, files: RequestFiles): Promise<FilesEntity[]> {
    await this.deleteFile(id);

    return this.saveFiles(files);
  }

  public async deleteFile(id: string): Promise<void> {
    const existFile = await this.filesRepository.findById(id);

    if (!existFile) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    try {
      for (const value of Object.values(existFile.toObject())) {
        if (typeof value === 'object' && 'path' in value) {
          const filePath = join(this.filesOptions.uploadDirectory || DEFAULT_UPLOAD_DIRECTORY, value.path);
          await unlink(filePath);
        }
      }

      await this.filesRepository.delete(existFile.id);
    } catch (error) {
      this.logger.error(createMessage(WRITE_FILE_ERROR, [error]));
      throw new InternalServerErrorException(createMessage(DELETE_FILE_ERROR, [error]))
    }
  }
}
