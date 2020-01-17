import { IResponse } from './response.interface';
import { UserStatistics } from '../models';

export type ListUsersResponse = IResponse<UserStatistics[], null>;
