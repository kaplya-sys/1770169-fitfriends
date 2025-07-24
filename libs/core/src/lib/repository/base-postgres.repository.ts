import {DefaultToObjectType, Entity, EntityId} from './entity.interface';
import {Repository} from './repository.interface';

export abstract class BasePostgresRepository<
    EntityType extends Entity<EntityId, DocumentType>,
    DocumentType = DefaultToObjectType,
    PrismaClientType = unknown
  > implements Repository<EntityType, DocumentType> {
  constructor(
    protected readonly prismaClient: PrismaClientType,
    private readonly createEntity: (document: DocumentType) => EntityType
  ) {}

  protected createEntityFromDocument(document: DocumentType): EntityType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document);
  }

  public findById(id: EntityType['id']): Promise<EntityType | null> {
    throw new Error('Method not implemented.');
  }
  public save(entity: EntityType): Promise<EntityType> {
    throw new Error('Method not implemented.');
  }
  public update(id: EntityType['id'], entity: EntityType): Promise<EntityType> {
    throw new Error('Method not implemented.');
  }
  public delete(id: EntityType['id']): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
