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

describe('Settings', () => {
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

  describe(`/GET settings`, () => {
    test('unauthorized request', () => {
      return request(app.getHttpServer())
        .get('/settings')
        .send()
        .expect(401, { data: null, error: 'Unauthorized' });
    });

    test('valid request', done => {
      return request(app.getHttpServer())
        .get('/settings')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(response => {
          expect(response.body).toHaveProperty('data');
          expect(response.body.data).toBeInstanceOf(Array);
          expect(response.body.data[0]).toHaveProperty('value');
          expect(response.body.data[0]).toHaveProperty('key');
          expect(response.body.data[0]).toHaveProperty('type');
          expect(response.body.data[0]).toHaveProperty('validators');
          expect(response.body.error).toBe(null);
          done();
        });
    });
  });

  describe(`/PUT settings`, () => {
    let settingId;

    beforeEach(done => {
      request(app.getHttpServer())
        .get('/settings')
        .set('Authorization', `Bearer ${token}`)
        .end((err, resp) => {
          settingId = resp.body.data[0].id;
          done();
        });
    });

    test('unauthorized request', () => {
      return request(app.getHttpServer())
        .put('/settings')
        .send({ patch: [{ value: 110, id: settingId }] })
        .expect(401, { data: null, error: 'Unauthorized' });
    });

    test('valid request', () => {
      return request(app.getHttpServer())
        .put('/settings')
        .set('Authorization', `Bearer ${token}`)
        .send({ patch: [{ value: 110, id: settingId }] })
        .expect(200)
        .then(_ =>
          request(app.getHttpServer())
            .get('/settings')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(resp => {
              expect(resp.body).toHaveProperty('data');
              expect(resp.body.data[0]).toHaveProperty('value');
            })
        );
    });
  });

  afterAll(async () => {
    await app.close();
    await clearDb();
  });
});
