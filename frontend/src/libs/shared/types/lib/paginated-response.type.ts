import {TrainingType} from './training.type';

export type PaginatedResponseType<T> = {
  trainingsWithPagination: TrainingType;
  entities: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
