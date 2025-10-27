import {Document, ObjectId} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {Subscriber} from '@1770169-fitfriends/types';

import {COLLECTION_NAME} from './subscriber.constants';

@Schema({
  collection: COLLECTION_NAME,
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

export class SubscriberModel extends Document<ObjectId> implements Subscriber {
  @Prop({
    required: true
  })
  public email!: string;

  @Prop({
    required: true
  })
  public userId!: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);

SubscriberSchema.virtual('id').get(function() {
  return this._id.toString();
})
