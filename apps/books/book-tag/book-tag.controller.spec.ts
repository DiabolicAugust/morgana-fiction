import { Test, TestingModule } from '@nestjs/testing';
import { BookTagController } from './book-tag.controller';
import { BookTagService } from './book-tag.service';

describe('BookTagController', () => {
  let controller: BookTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookTagController],
      providers: [BookTagService],
    }).compile();

    controller = module.get<BookTagController>(BookTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
