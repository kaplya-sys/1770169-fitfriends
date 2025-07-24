import {Document, ObjectId} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {FileInfo, FileUpload} from '@1770169-guitar/types';

import {COLLECTION_NAME} from './files.constant';


@Schema({
  collection: COLLECTION_NAME,
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})
export class FilesModel extends Document<ObjectId> implements FileUpload {


  @Prop({
    required: true
  })
  public originalName!: string;

  @Prop({
    required: true
  })
  public subDirectory!: string;

  @Prop({
    required: true
  })
  public catalog!: string;

  @Prop({
    required: true
  })
  public size!: number;

  @Prop({
    required: true
  })
  public mimetype!: string;

  @Prop({
    required: true,
    type: Object
  })
  public file!: FileInfo;

  @Prop({
    type: Object
  })
  public file2x?: FileInfo;
}

export const FilesSchema = SchemaFactory.createForClass(FilesModel);

FilesSchema.virtual('id').get(function() {
  return this._id.toString();
});
