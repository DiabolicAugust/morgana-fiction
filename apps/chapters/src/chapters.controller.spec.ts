import { Test, TestingModule } from '@nestjs/testing';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';

describe('ChaptersController', () => {
  let chaptersController: ChaptersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChaptersController],
      providers: [ChaptersService],
    }).compile();

    chaptersController = app.get<ChaptersController>(ChaptersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chaptersController.getHello()).toBe('Hello World!');
    });
  });
});
