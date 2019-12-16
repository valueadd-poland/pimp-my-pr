import { Test, TestingModule } from '@nestjs/testing';

import { ProjectController } from './project.controller';
import { ProjectFacade } from '@pimp-my-pr/pmp-api/project/core';
import * as mocks from 'node-mocks-http';

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
      const response = mocks.createResponse();
      controller.sync(response);
      expect(response.statusCode).toBe(200);
    });
  });
});
