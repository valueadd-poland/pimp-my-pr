import { Pagination } from './pagination.interface';

export interface TableConfig<T> {
  data: T;
  columns: string[];
  pagination: Pagination;
}
