import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { SubjectTimeService } from './subject-time.service';
import { CreateSubjectTimeDto } from './dto/create-subject-time.dto';
import { UpdateSubjectTimeDto } from './dto/update-subject-time.dto';

import { SubjectTime } from './entities/subject-time.entity';

@ApiTags('subject-time')
@Controller('subject-time')
export class SubjectTimeController {
  constructor(private readonly subjectTimeService: SubjectTimeService) {}

  @Post()
  @ApiCreatedResponse({ type: SubjectTime })
  create(@Body() createSubjectTimeDto: CreateSubjectTimeDto) {
    return this.subjectTimeService.create(createSubjectTimeDto);
  }

  @Get()
  @ApiOkResponse({ type: [SubjectTime] })
  findAll() {
    return this.subjectTimeService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SubjectTime })
  findOne(@Param('id') id: string) {
    return this.subjectTimeService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SubjectTime })
  update(@Param('id') id: string, @Body() updateSubjectTimeDto: UpdateSubjectTimeDto) {
    return this.subjectTimeService.update(+id, updateSubjectTimeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SubjectTime })
  remove(@Param('id') id: string) {
    return this.subjectTimeService.remove(+id);
  }
}
