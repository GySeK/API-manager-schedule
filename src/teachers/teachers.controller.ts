import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

import { Teacher } from './entities/teacher.entity';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiCreatedResponse({ type: Teacher })
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOkResponse({ type: [Teacher] })
  async findAll() {
    return await this.teachersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Teacher })
  async findOne(@Param('id') id: string) {
    return await this.teachersService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Teacher })
  async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return await this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Teacher })
  async remove(@Param('id') id: string) {
    return await this.teachersService.remove(+id);
  }
}
