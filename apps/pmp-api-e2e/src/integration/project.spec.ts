import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PmpApiProjectApiModule } from '@pimp-my-pr/pmp-api/project/api';

describe('Project', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PmpApiProjectApiModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET sync`, () => {
    return request(app.getHttpServer())
      .get('/project/sync')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
