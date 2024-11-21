import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTeacherSubjectDto } from './dto/create-teacher-subject.dto';
import { UpdateTeacherSubjectDto } from './dto/update-teacher-subject.dto';

import { TeacherSubject } from './entities/teacher-subject.entity';

@Injectable()
export class TeacherSubjectService {
  constructor(
    @InjectRepository(TeacherSubject)
    private teacherSubjectRepository: Repository<TeacherSubject>,
  ) {}

  async create(createTeacherSubjectDto: CreateTeacherSubjectDto) {
    return this.teacherSubjectRepository.save(this.teacherSubjectRepository.create(createTeacherSubjectDto));
  }

  async findAll() {
    return await this.teacherSubjectRepository.find();
  }

  async findByTeacher(teacherId: number) {
    return await this.teacherSubjectRepository.findBy( {teacherId} )
  }

  async findBySubject(subjectId: number) {
    return await this.teacherSubjectRepository.findBy( {subjectId} )
  }

  async findOne(id: number) {
    return await this.teacherSubjectRepository.findOneBy( {id} )
  }

  async update(id: number, updateTeacherSubjectDto: UpdateTeacherSubjectDto) {
    return await this.teacherSubjectRepository.update(id, updateTeacherSubjectDto)
  }

  async remove(id: number) {
    return await this.teacherSubjectRepository.delete(id);
  }
}
