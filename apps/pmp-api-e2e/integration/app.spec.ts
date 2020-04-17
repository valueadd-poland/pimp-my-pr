//  TODO to remove, disable only to show proposal of usage
//  tslint:disable-next-line

describe('Mockup', () => {
  it('empty test', () => {
    expect(true).toBe(true);
  });
});

// describe('Application', () => {
//   let app: INestApplication;
//
//   beforeAll(async () => {
//     const module = await Test.createTestingModule({
//       imports: [AppModule]
//     }).compile();
//
//     app = module.createNestApplication();
//     await app.init();
//   });
//
//   it(`/GET hello`, () => {
//     return request(app.getHttpServer())
//       .get('/hello')
//       .expect(200, 'Welcome to api!');
//   });
//
//   afterAll(async () => {
//     await app.close();
//   });
// });
