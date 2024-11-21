import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

import { Subject } from './entities/subject.entity';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @ApiCreatedResponse({ type: Subject })
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  @ApiOkResponse({ type: [Subject] })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Subject })
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Subject })
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Subject })
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }
}
