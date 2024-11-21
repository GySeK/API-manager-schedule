import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.groupRepository.save(this.groupRepository.create(createGroupDto));
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async findOne(id: number) {
    return await this.groupRepository.findOneBy( {id} )
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    return await this.groupRepository.update(id, updateGroupDto)
  }

  async remove(id: number) {
    return await this.groupRepository.delete(id);
  }
}
