import {Document, Model, ObjectId, ToObjectOptions} from 'mongoose';
import {NotFoundException} from '@nestjs/common';

import {createMessage} from '@1770169-fitfriends/helpers';
import {Timestamps} from '@1770169-fitfriends/types';

import {Entity, EntityId} from './entity.interface';
import {Repository} from './repository.interface';
import {NOT_FOUND_MESSAGE} from './repository.constant';

export abstract class BaseMongoRepository<
    EntityType extends Entity<EntityId>,
    DocumentType extends Document<ObjectId> & Timestamps
  > implements Repository<EntityType> {
    constructor(
      protected readonly model: Model<DocumentType>,
      private readonly createEntity: (document: DocumentType) => EntityType
    ) {}

  protected createEntityFromDocument(document: DocumentType | null) {
    if(!document) {
      return null;
    }
    const options: ToObjectOptions = {
      versionKey: false
    };

    return this.createEntity(document.toObject(options));
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    const document = await this.model.findById(id).exec();

    return this.createEntityFromDocument(document);
  }

  public async save(entity: EntityType): Promise<EntityType> {
    const newEntity = new this.model(entity.toObject());
    await newEntity.save();
    entity.id = newEntity._id.toString();
    entity.createdAt = newEntity.createdAt;

    return entity;
  }

  public async update(id: EntityType['id'], entity: EntityType): Promise<EntityType> {
    const document = await this.model.findByIdAndUpdate(
      id,
      entity.toObject(),
      {
        new: true,
        runValidators: true,
        strict: false
      }).exec();

    if(!document) {
      throw new NotFoundException(createMessage(NOT_FOUND_MESSAGE, [id]));
    }

    return entity;
  }

  public async delete(id: EntityType['id']): Promise<void> {
    const document = await this.model.findByIdAndDelete(id);

    if(!document) {
      throw new NotFoundException(createMessage(NOT_FOUND_MESSAGE, [id]));
    }
  }

}
