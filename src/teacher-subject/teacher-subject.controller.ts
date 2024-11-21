import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { TeacherSubjectService } from './teacher-subject.service';
import { CreateTeacherSubjectDto } from './dto/create-teacher-subject.dto';
import { UpdateTeacherSubjectDto } from './dto/update-teacher-subject.dto';

import { TeacherSubject } from './entities/teacher-subject.entity';

@ApiTags('teacher-subject')
@Controller('teacher-subject')
export class TeacherSubjectController {
  constructor(private readonly teacherSubjectService: TeacherSubjectService) {}

  @Post()
  @ApiCreatedResponse({ type: TeacherSubject })
  create(@Body() createTeacherSubjectDto: CreateTeacherSubjectDto) {
    return this.teacherSubjectService.create(createTeacherSubjectDto);
  }

  @Get()
  @ApiOkResponse({ type: [TeacherSubject] })
  findAll() {
    return this.teacherSubjectService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TeacherSubject })
  findOne(@Param('id') id: string) {
    return this.teacherSubjectService.findOne(+id);
  }

  @Get('teacher/:id')
  @ApiOkResponse({ type: TeacherSubject })
  findByTeacher(@Param('id') id: string) {
    return this.teacherSubjectService.findByTeacher(+id);
  }

  @Get('subject/:id')
  @ApiOkResponse({ type: TeacherSubject })
  findBySubject(@Param('id') id: string) {
    return this.teacherSubjectService.findBySubject(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TeacherSubject })
  update(@Param('id') id: string, @Body() updateTeacherSubjectDto: UpdateTeacherSubjectDto) {
    return this.teacherSubjectService.update(+id, updateTeacherSubjectDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TeacherSubject })
  remove(@Param('id') id: string) {
    return this.teacherSubjectService.remove(+id);
  }
}
