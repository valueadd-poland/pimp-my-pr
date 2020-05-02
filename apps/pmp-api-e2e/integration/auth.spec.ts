import { HttpService, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ServerAuthApiRestModule } from '@pimp-my-pr/server/auth/api-rest';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import { ServerSharedCoreApiRestModule } from '@pimp-my-pr/server/shared/core-api-rest';
import { ServerUserPublicModule } from '@pimp-my-pr/server/user/public';
import { Platform } from '@pimp-my-pr/shared/domain';
import * as request from 'supertest';
import { clearDb } from '../utils/clear-db.util';
import { MockHttpService } from '../utils/mock-http.service';

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ServerUserPublicModule,
        ServerAuthApiRestModule,
        ServerSharedCoreModule,
        ServerSharedCoreApiRestModule
      ]
    })
      .overrideProvider(HttpService)
      .useClass(MockHttpService)
      .compile();

    app = module.createNestApplication();
    await clearDb();
    await app.init();
  });

  test(`/POST access-token`, done => {
    return request(app.getHttpServer())
      .post('/auth/access-token')
      .send({ platform: Platform.github, code: '1234' })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data.token).toBeTruthy();
        done();
      });
  });

  afterAll(async () => {
    await app.close();
    await clearDb();
  });
});
