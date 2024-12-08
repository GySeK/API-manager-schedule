import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { UpdateResult } from 'typeorm';

describe('GroupsController', () => {
  let controller: GroupsController;
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        {
          provide: GroupsService,
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

    controller = module.get<GroupsController>(GroupsController);
    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new group', async () => {
      const createGroupDto: CreateGroupDto = { name: 'Test Group' };
      const createdGroup = new Group();
      createdGroup.id = 1;
      createdGroup.name = createGroupDto.name;

      jest.spyOn(service, 'create').mockResolvedValue(createdGroup);

      const result = await controller.create(createGroupDto);
      expect(result).toEqual(createdGroup);
      expect(service.create).toHaveBeenCalledWith(createGroupDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      const groups: Group[] = [new Group(), new Group()];
      jest.spyOn(service, 'findAll').mockResolvedValue(groups);

      const result = await controller.findAll();
      expect(result).toEqual(groups);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single group', async () => {
      const group = new Group();
      group.id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(group);

      const result = await controller.findOne('1');
      expect(result).toEqual(group);
      expect(service.findOne).toHaveBeenCalledWith(1);
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

      jest.spyOn(service, 'update').mockResolvedValue(updateResult);

      const result = await controller.update('1', updateGroupDto);
      expect(result).toEqual(updateResult);
      expect(service.update).toHaveBeenCalledWith(1, updateGroupDto);
    });
  });

  describe('remove', () => {
    it('should remove a group', async () => {
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
