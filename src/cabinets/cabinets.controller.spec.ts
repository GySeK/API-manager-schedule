import { Test, TestingModule } from '@nestjs/testing';
import { CabinetsController } from './cabinets.controller';
import { CabinetsService } from './cabinets.service';

describe('CabinetsController', () => {
  let controller: CabinetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CabinetsController],
      providers: [CabinetsService],
    }).compile();

    controller = module.get<CabinetsController>(CabinetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
