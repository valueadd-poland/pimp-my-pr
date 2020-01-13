import { Pagination } from './pagination.interface';
import { ColumnConfig } from './column.config';

export interface TableConfig<T> {
  data: T;
  columns: ColumnConfig[];
  pagination?: Pagination;
}
