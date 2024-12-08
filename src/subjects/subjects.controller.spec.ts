import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { UpdateResult } from 'typeorm';

describe('SubjectsController', () => {
  let controller: SubjectsController;
  let service: SubjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectsController],
      providers: [
        {
          provide: SubjectsService,
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

    controller = module.get<SubjectsController>(SubjectsController);
    service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new subject', async () => {
      const createSubjectDto: CreateSubjectDto = { name: 'Test Subject', complexity: 5 };
      const createdSubject = new Subject();
      createdSubject.id = 1;
      createdSubject.name = createSubjectDto.name;
      createdSubject.complexity = createSubjectDto.complexity;

      jest.spyOn(service, 'create').mockResolvedValue(createdSubject);

      const result = await controller.create(createSubjectDto);
      expect(result).toEqual(createdSubject);
      expect(service.create).toHaveBeenCalledWith(createSubjectDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of subjects', async () => {
      const subjects: Subject[] = [
        { id: 1, name: 'Subject 1', complexity: 3 },
        { id: 2, name: 'Subject 2', complexity: 4 },
      ] as Subject[];
      jest.spyOn(service, 'findAll').mockResolvedValue(subjects);

      const result = await controller.findAll();
      expect(result).toEqual(subjects);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single subject', async () => {
      const subject = { id: 1, name: 'Subject 1', complexity: 3 } as Subject;
      jest.spyOn(service, 'findOne').mockResolvedValue(subject);

      const result = await controller.findOne('1');
      expect(result).toEqual(subject);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a subject', async () => {
      const updateSubjectDto: UpdateSubjectDto = { name: 'Updated Subject', complexity: 6 };
      const updateResult: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updateResult);

      const result = await controller.update('1', updateSubjectDto);
      expect(result).toEqual(updateResult);
      expect(service.update).toHaveBeenCalledWith(1, updateSubjectDto);
    });
  });

  describe('remove', () => {
    it('should remove a subject', async () => {
      const deleteResult: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(deleteResult);

      const result = await controller.remove('1');
      expect(result).toEqual(deleteResult);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
