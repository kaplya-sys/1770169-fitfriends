export type PaginatedResponseType<T> = {
  entities: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
