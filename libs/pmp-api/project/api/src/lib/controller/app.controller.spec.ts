import { Test, TestingModule } from '@nestjs/testing';

import { ProjectController } from './project.controller';
import { ProjectFacade } from '@pimp-my-pr/pmp-api/project/core';

const mockProjectFacade = {
  sync() {
    return Promise.resolve();
  }
};

describe('ProjectController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [{ provide: ProjectFacade, useValue: mockProjectFacade }],
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
