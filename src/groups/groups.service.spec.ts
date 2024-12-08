import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { GroupsService } from './groups.service';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ScheduleBlock } from 'src/schedule/entities/scheduleBlock.entity';

describe('GroupsService', () => {
  let service: GroupsService;
  let repository: Repository<Group>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: getRepositoryToken(Group),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    repository = module.get<Repository<Group>>(getRepositoryToken(Group));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new group', async () => {
      const createGroupDto: CreateGroupDto = { name: 'Test Group' };
      const createdGroup = new Group();
      createdGroup.id = 1;
      createdGroup.name = createGroupDto.name;
      createdGroup.scheduleBlocks = [];

      jest.spyOn(repository, 'create').mockReturnValue(createdGroup);
      jest.spyOn(repository, 'save').mockResolvedValue(createdGroup);

      const result = await service.create(createGroupDto);
      expect(result).toEqual(createdGroup);
    });
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      const groups: Group[] = [new Group(), new Group()];
      jest.spyOn(repository, 'find').mockResolvedValue(groups);

      const result = await service.findAll();
      expect(result).toEqual(groups);
    });
  });

  describe('findOne', () => {
    it('should return a single group', async () => {
      const group = new Group();
      group.id = 1;
      group.scheduleBlocks = [];
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(group);

      const result = await service.findOne(1);
      expect(result).toEqual(group);
    });
  });

  describe('update', () => {
    it('should update a group', async () => {
      const updateGroupDto: UpdateGroupDto = { name: 'Updated Group' };
      const updateResult: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest.spyOn(repository, 'update').mockResolvedValue(updateResult);

      const result = await service.update(1, updateGroupDto);
      expect(result).toEqual(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove a group', async () => {
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