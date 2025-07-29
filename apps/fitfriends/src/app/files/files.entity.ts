import {Entity} from '@1770169-fitfriends/core';
import {FileInfo, FileUpload} from '@1770169-fitfriends/types';


export class FilesEntity implements FileUpload, Entity<string> {
  public id?: string;
  public originalName!: string;
  public subDirectory!: string;
  public catalog!: string;
  public size!: number;
  public mimetype!: string;
  public image!: FileInfo;
  public image2x?: FileInfo;
  public imageWeb?: FileInfo;
  public imageWeb2x?: FileInfo;
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
      image: this.image,
      image2x: this.image2x,
      imageWeb: this.imageWeb,
      imageWeb2x: this.imageWeb2x,
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
    this.image = file.image;
    this.image2x = file.image2x;
    this.imageWeb = file.imageWeb;
    this.imageWeb2x = file.imageWeb2x;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;

    return this;
  }

}
