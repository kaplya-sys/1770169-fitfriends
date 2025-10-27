import {Entity, FileInfo, FileUpload} from '@1770169-fitfriends/types';

export class FilesEntity implements FileUpload, Entity<string> {
  public id?: string;
  public originalName!: string;
  public subDirectory!: string;
  public catalog!: string;
  public size!: number;
  public mimetype!: string;
  public image?: FileInfo;
  public image2x?: FileInfo;
  public imageWebp?: FileInfo;
  public imageWebp2x?: FileInfo;
  public video?: FileInfo;
  public document?: FileInfo;
  public createdAt?: Date;

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
      imageWebp: this.imageWebp,
      imageWebp2x: this.imageWebp2x,
      video: this.video,
      document: this.document,
      createdAt: this.createdAt
    }
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
    this.imageWebp = file.imageWebp;
    this.imageWebp2x = file.imageWebp2x;
    this.video = file.video;
    this.document = file.document;
    this.createdAt = file.createdAt;

    return this;
  }

  static fromObject(file: FileUpload) {
    return new FilesEntity(file);
  }
}
