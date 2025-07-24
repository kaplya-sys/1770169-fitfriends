export type EntityId = string;
export type DefaultToObjectType = Record<string, unknown>;
export interface Entity<T extends EntityId, ToObjectType = DefaultToObjectType> {
  id?: T;
  toObject(): ToObjectType;
  createdAt?: Date;
  updatedAt?: Date;
};
