import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubjectTimeDto } from './dto/create-subject-time.dto';
import { UpdateSubjectTimeDto } from './dto/update-subject-time.dto';

import { SubjectTime } from './entities/subject-time.entity';

@Injectable()
export class SubjectTimeService {
  constructor(
    @InjectRepository(SubjectTime)
    private subjectTimeRepository: Repository<SubjectTime>,
  ) {}

  async create(createSubjectTimeDto: CreateSubjectTimeDto) {
    return this.subjectTimeRepository.save(this.subjectTimeRepository.create(createSubjectTimeDto));
  }

  async findAll() {
    return await this.subjectTimeRepository.find();
  }

  async findOne(teacherSubjectId: number) {
    return await this.subjectTimeRepository.findOneBy( {teacherSubjectId} )
  }

  async update(id: number, updateSubjectTimeDto: UpdateSubjectTimeDto) {
    return await this.subjectTimeRepository.update(id, updateSubjectTimeDto)
  }

  async remove(teacherSubjectId: number) {
    return await this.subjectTimeRepository.delete(teacherSubjectId);
  }
}
