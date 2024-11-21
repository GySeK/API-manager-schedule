import { Test, TestingModule } from '@nestjs/testing';
import { SubjectTimeController } from './subject-time.controller';
import { SubjectTimeService } from './subject-time.service';

describe('SubjectTimeController', () => {
  let controller: SubjectTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectTimeController],
      providers: [SubjectTimeService],
    }).compile();

    controller = module.get<SubjectTimeController>(SubjectTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
