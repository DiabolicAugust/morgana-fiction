import { Test, TestingModule } from '@nestjs/testing';
import { BookTagService } from './book-tag.service';

describe('BookTagService', () => {
  let service: BookTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookTagService],
    }).compile();

    service = module.get<BookTagService>(BookTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
