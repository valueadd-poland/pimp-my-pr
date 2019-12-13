import { Test, TestingModule } from '@nestjs/testing';

import { ProjectController } from './project.controller';

describe('ProjectController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProjectController]
    }).compile();
  });

  describe('sync', () => {
    it('should return successful response', () => {
      const controller = app.get<ProjectController>(ProjectController);
      expect(controller.sync()).toBeTruthy();
    });
  });
});
