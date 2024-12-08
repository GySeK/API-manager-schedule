import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CabinetsService } from './cabinets.service';
import { Cabinet } from './entities/cabinet.entity';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';

describe('CabinetsService', () => {
  let service: CabinetsService;
  let repository: Repository<Cabinet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CabinetsService,
        {
          provide: getRepositoryToken(Cabinet),
          useClass: Repository,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(Cabinet))
      .useValue({
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOneBy: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })
      .compile();

    service = module.get<CabinetsService>(CabinetsService);
    repository = module.get<Repository<Cabinet>>(getRepositoryToken(Cabinet));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cabinet', async () => {
      const createCabinetDto: CreateCabinetDto = { name: 'Cabinet 1' };
      const savedCabinet = new Cabinet();
      savedCabinet.name = createCabinetDto.name;

      (repository.create as jest.Mock).mockReturnValue(savedCabinet);
      (repository.save as jest.Mock).mockResolvedValue(savedCabinet);

      const result = await service.create(createCabinetDto);
      expect(result).toBe(savedCabinet);
      expect(repository.create).toHaveBeenCalledWith(createCabinetDto);
      expect(repository.save).toHaveBeenCalledWith(savedCabinet);
    });
  });

  describe('findAll', () => {
    it('should return an array of cabinets', async () => {
      const cabinets = [new Cabinet(), new Cabinet()];
      (repository.find as jest.Mock).mockResolvedValue(cabinets);

      const result = await service.findAll();
      expect(result).toBe(cabinets);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a cabinet by id', async () => {
      const id = 1;
      const cabinet = new Cabinet();
      (repository.findOneBy as jest.Mock).mockResolvedValue(cabinet);

      const result = await service.findOne(id);
      expect(result).toBe(cabinet);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('update', () => {
    it('should update a cabinet', async () => {
      const id = 1;
      const updateCabinetDto: UpdateCabinetDto = { name: 'Updated Cabinet' };
      const updatedCabinet = new Cabinet();
      updatedCabinet.name = updateCabinetDto.name;
      (repository.update as jest.Mock).mockResolvedValue(updatedCabinet);

      const result = await service.update(id, updateCabinetDto);
      expect(result).toBe(updatedCabinet);
      expect(repository.update).toHaveBeenCalledWith(id, updateCabinetDto);
    });
  });

  describe('remove', () => {
    it('should remove a cabinet', async () => {
      const id = 1;
      const deletedCabinet = new Cabinet();
      (repository.delete as jest.Mock).mockResolvedValue(deletedCabinet);

      const result = await service.remove(id);
      expect(result).toBe(deletedCabinet);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
