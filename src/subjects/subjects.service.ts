import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return this.subjectRepository.save(this.subjectRepository.create(createSubjectDto));
  }

  async findAll() {
    return await this.subjectRepository.find();
  }

  async findOne(id: number) {
    return await this.subjectRepository.findOneBy( {id} )
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return await this.subjectRepository.update(id, updateSubjectDto)
  }

  async remove(id: number) {
    return await this.subjectRepository.delete(id);
  }
}
