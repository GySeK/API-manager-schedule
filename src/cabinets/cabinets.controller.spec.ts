import { Test, TestingModule } from '@nestjs/testing';
import { CabinetsController } from './cabinets.controller';
import { CabinetsService } from './cabinets.service';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';
import { Cabinet } from './entities/cabinet.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('CabinetsController', () => {
  let controller: CabinetsController;
  let service: CabinetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CabinetsController],
      providers: [
        {
          provide: CabinetsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CabinetsController>(CabinetsController);
    service = module.get<CabinetsService>(CabinetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cabinet', async () => {
      const createCabinetDto: CreateCabinetDto = { name: 'Cabinet 1' };
      const createdCabinet = new Cabinet();
      createdCabinet.name = createCabinetDto.name;

      jest.spyOn(service, 'create').mockResolvedValue(createdCabinet);

      const result = await controller.create(createCabinetDto);
      expect(result).toBe(createdCabinet);
      expect(service.create).toHaveBeenCalledWith(createCabinetDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of cabinets', async () => {
      const cabinets = [new Cabinet(), new Cabinet()];

      jest.spyOn(service, 'findAll').mockResolvedValue(cabinets);

      const result = await controller.findAll();
      expect(result).toBe(cabinets);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a cabinet by id', async () => {
      const id = '1';
      const cabinet = new Cabinet();

      jest.spyOn(service, 'findOne').mockResolvedValue(cabinet);

      const result = await controller.findOne(id);
      expect(result).toBe(cabinet);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a cabinet', async () => {
      const id = '1';
      const updateCabinetDto: UpdateCabinetDto = { name: 'Updated Cabinet' };
      const updateResult: UpdateResult = { generatedMaps: [], raw: [], affected: 1 };

      jest.spyOn(service, 'update').mockResolvedValue(updateResult);

      const result = await controller.update(id, updateCabinetDto);
      expect(result).toBe(updateResult);
      expect(service.update).toHaveBeenCalledWith(+id, updateCabinetDto);
    });
  });

  describe('remove', () => {
    it('should remove a cabinet', async () => {
      const id = '1';
      const deleteResult: DeleteResult = { raw: [], affected: 1 };

      jest.spyOn(service, 'remove').mockResolvedValue(deleteResult);

      const result = await controller.remove(id);
      expect(result).toBe(deleteResult);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
