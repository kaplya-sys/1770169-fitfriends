import {randomUUID} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';

import 'multer';
import dayjs from 'dayjs';
import {Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {ensureDir} from 'fs-extra';
import {extension} from 'mime-types';

import {FilesConfig} from '@1770169-guitar/config';
import {convertFileBuffer, createMessage, normalizePath} from '@1770169-guitar/helpers';
import {StoredFile, FieldName, RequestFiles} from '@1770169-guitar/types';

import {FilesEntity} from './files.entity';
import {
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
      const file = `${filename}.${fileExtension}`;
      const file2x = `${filename}@2x.${fileExtension}`;
      const filePath = normalizePath(join(uploadDirectory, file));
      const file2xPath = normalizePath(join(uploadDirectory, file2x));
      const bufferVariant = await convertFileBuffer(buffer);

      await ensureDir(uploadDirectory);
      await writeFile(filePath, new Uint8Array(bufferVariant.file));
      await writeFile(file2xPath, new Uint8Array(bufferVariant.file2x))

      return {
        catalog,
        subDirectory: normalizePath(subDirectory),
        file: {
          hashName: file,
          path: filePath
        },
        file2x: {
          hashName: file2x,
          path: file2xPath
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
        file: {
          hashName: recordedFile.file.hashName,
          path: recordedFile.file.path
        },
        file2x: {
          hashName: recordedFile.file2x.hashName,
          path: recordedFile.file2x.path
        },
        mimetype: value[0].mimetype,
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
}
