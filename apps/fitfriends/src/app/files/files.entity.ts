import {Entity} from '@1770169-guitar/core';
import {FileInfo, FileUpload} from '@1770169-guitar/types';


export class FilesEntity implements FileUpload, Entity<string> {
  public id?: string;
  public originalName!: string;
  public subDirectory!: string;
  public catalog!: string;
  public size!: number;
  public mimetype!: string;
  public file!: FileInfo;
  public file2x?: FileInfo;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(file: FileUpload) {
    this.populate(file);
  }

  public toObject() {
    return {
      id: this.id,
      originalName: this.originalName,
      subDirectory: this.subDirectory,
      catalog: this.catalog,
      size: this.size,
      mimetype: this.mimetype,
      file: this.file,
      file2x: this.file2x,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  static fromObject(file: FileUpload) {
    return new FilesEntity(file);
  }

  public populate(file: FileUpload) {
    this.id = file.id;
    this.originalName = file.originalName;
    this.subDirectory = file.subDirectory;
    this.catalog = file.catalog,
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.file = file.file;
    this.file2x = file.file2x;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;

    return this;
  }

}
