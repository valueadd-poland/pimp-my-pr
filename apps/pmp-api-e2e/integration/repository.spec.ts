import { HttpService, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ServerAuthApiRestModule } from '@pimp-my-pr/server/auth/api-rest';
import { ServerRepositoryApiRestModule } from '@pimp-my-pr/server/repository/api-rest';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import { ServerSharedCoreApiRestModule } from '@pimp-my-pr/server/shared/core-api-rest';
import { ServerUserPublicModule } from '@pimp-my-pr/server/user/public';
import { Platform } from '@pimp-my-pr/shared/domain';
import * as request from 'supertest';
import { clearDb } from '../utils/clear-db.util';
import { MockHttpService } from '../utils/mock-http.service';

describe('Repository', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async done => {
    const module = await Test.createTestingModule({
      imports: [
        ServerRepositoryApiRestModule,
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
    app.useGlobalPipes(new ValidationPipe());
    await clearDb();
    await app.init();

    request(app.getHttpServer())
      .post('/auth/access-token')
      .send({ platform: Platform.github, code: '1234' })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data.token).toBeTruthy();
        token = res.body.data.token;
        done();
      });
  });

  describe(`/POST repository`, () => {
    test('unauthorized request', () => {
      return request(app.getHttpServer())
        .post('/repository')
        .send({ repositoryUrl: 'https://github.com/valueadd-poland/pimp-my-pr' })
        .expect(401, { data: null, error: 'Unauthorized' });
    });

    test('bad request', done => {
      return request(app.getHttpServer())
        .post('/repository')
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toHaveLength(1);
          expect(res.body.error[0].property).toEqual('repositoryUrl');
          done();
        });
    });

    test('valid request', () => {
      return request(app.getHttpServer())
        .post('/repository')
        .set('Authorization', `Bearer ${token}`)
        .send({ repositoryUrl: 'https://github.com/valueadd-poland/pimp-my-pr' })
        .expect(201, { error: null });
    });
  });

  describe(`/GET repositories`, () => {
    test('unauthorized request', () => {
      return request(app.getHttpServer())
        .get('/repository')
        .expect(401, { data: null, error: 'Unauthorized' });
    });

    test('valid request', () => {
      return request(app.getHttpServer())
        .get('/repository')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, {
          data: [
            {
              id: '22123383112345',
              repositoryId: '221233831',
              name: 'pimp-my-pr',
              owner: 'valueadd-poland',
              pictureUrl: 'https://avatars1.githubusercontent.com/u/49273957?v=4',
              maxWaitingTime: null,
              maxLines: null
            }
          ],
          error: null
        });
    });
  });

  afterAll(async () => {
    await app.close();
    await clearDb();
  });
});
