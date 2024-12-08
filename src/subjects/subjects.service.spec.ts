import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

describe('SubjectsService', () => {
  let service: SubjectsService;
  let repository: Repository<Subject>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectsService,
        {
          provide: getRepositoryToken(Subject),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
    repository = module.get<Repository<Subject>>(getRepositoryToken(Subject));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new subject', async () => {
      const createSubjectDto: CreateSubjectDto = { name: 'Test Subject', complexity: 5 };
      const createdSubject = new Subject();
      createdSubject.id = 1;
      createdSubject.name = createSubjectDto.name;
      createdSubject.complexity = createSubjectDto.complexity;

      jest.spyOn(repository, 'create').mockReturnValue(createdSubject);
      jest.spyOn(repository, 'save').mockResolvedValue(createdSubject);

      const result = await service.create(createSubjectDto);
      expect(result).toEqual(createdSubject);
    });
  });

  describe('findAll', () => {
    it('should return an array of subjects', async () => {
      const subjects: Subject[] = [
        { id: 1, name: 'Subject 1', complexity: 3 },
        { id: 2, name: 'Subject 2', complexity: 4 },
      ] as Subject[];
      jest.spyOn(repository, 'find').mockResolvedValue(subjects);

      const result = await service.findAll();
      expect(result).toEqual(subjects);
    });
  });

  describe('findOne', () => {
    it('should return a single subject', async () => {
      const subject = { id: 1, name: 'Subject 1', complexity: 3 } as Subject;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(subject);

      const result = await service.findOne(1);
      expect(result).toEqual(subject);
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

      jest.spyOn(repository, 'update').mockResolvedValue(updateResult);

      const result = await service.update(1, updateSubjectDto);
      expect(result).toEqual(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove a subject', async () => {
      const deleteResult: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      const result = await service.remove(1);
      expect(result).toEqual(deleteResult);
    });
  });
});