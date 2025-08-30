import {Document, Model, ObjectId, ToObjectOptions} from 'mongoose';

import {Entity, EntityId, Repository, Timestamps} from '@1770169-fitfriends/types';

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

  public async update(id: EntityType['id'], entity: EntityType): Promise<EntityType | null> {
    const document = await this.model.findByIdAndUpdate(
      id,
      entity.toObject(),
      {
        new: true,
        runValidators: true,
        strict: false
      }).exec();

    return this.createEntityFromDocument(document);
  }

  public async delete(id: EntityType['id']): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
