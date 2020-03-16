import { ColumnConfig } from './column.config';
import { Pagination } from './pagination.interface';

export interface TableConfig<T> {
  data: T;
  columns: ColumnConfig[];
  pagination?: Pagination;
}
