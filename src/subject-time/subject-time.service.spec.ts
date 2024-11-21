import { Test, TestingModule } from '@nestjs/testing';
import { SubjectTimeService } from './subject-time.service';

describe('SubjectTimeService', () => {
  let service: SubjectTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectTimeService],
    }).compile();

    service = module.get<SubjectTimeService>(SubjectTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
