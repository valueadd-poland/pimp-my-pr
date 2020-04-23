import { IResponse } from './response.interface';
import { User } from '../read-models/user.read-model';

export type UserInfoResponse = IResponse<User, null>;
