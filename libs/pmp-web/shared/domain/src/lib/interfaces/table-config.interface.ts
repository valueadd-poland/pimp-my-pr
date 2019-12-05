import { Pagination } from './pagination.interface';

export interface TableConfig {
  data: any;
  columns: string[];
  pagination: Pagination;
}
