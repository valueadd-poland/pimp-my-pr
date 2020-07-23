import { RequestType } from '../enums/request-type.enum';

export interface ApiCallFixture {
  name: string;
  url: string;
  file: string;
  method?: RequestType;
}
