import {DefaultToObjectType, Entity, EntityId} from './entity.interface';

export interface Repository<
    EntityType extends Entity<EntityId, ToObjectType>,
    ToObjectType = DefaultToObjectType
  > {
  findById(id: EntityType['id']): Promise<EntityType | null>;
  save(entity: EntityType): Promise<EntityType>;
  update(id: EntityType['id'], entity: EntityType): Promise<EntityType>;
  delete(id: EntityType['id']): Promise<void>;
}
