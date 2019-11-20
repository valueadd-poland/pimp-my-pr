import { Injectable } from '@nestjs/common';
import { Message } from '@pimp-my-pr/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
