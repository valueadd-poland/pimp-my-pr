import { Pagination } from './pagination.interface';

export interface TableData<T> {
  data: T;
  pagination: Pagination;
}
