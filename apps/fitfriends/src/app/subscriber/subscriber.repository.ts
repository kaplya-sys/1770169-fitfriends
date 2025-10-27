import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {BaseMongoRepository} from '@1770169-fitfriends/core';

import {SubscriberEntity} from './subscriber.entity';
import {SubscriberModel} from './subscriber.model';

export class SubscriberRepository extends BaseMongoRepository<SubscriberEntity, SubscriberModel> {
  constructor(
    @InjectModel(SubscriberModel.name) subscriberModel: Model<SubscriberModel>
  ) {
    super(subscriberModel, SubscriberEntity.fromObject);
  }

  public async findEmail(email: string) {
    const document = await this.model.findOne({email}).exec();

    return this.createEntityFromDocument(document);
  }

  public async findManyByUserId(userId: string) {
    const documents = await this.model.find({userId});

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async findByUserIdAndEmail(email: string, userId: string) {
    const document = await this.model.findOne({userId, email});

    return this.createEntityFromDocument(document);
  }
}
