import { IResponse } from './response.interface';
import { UserStatistics } from '../models/user.statistics';

export type ListUsersResponse = IResponse<UserStatistics[], null>;
