import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

import { Group } from './entities/group.entity';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiCreatedResponse({ type: Group })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiOkResponse({ type: [Group] })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Group })
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Group })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Group })
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
