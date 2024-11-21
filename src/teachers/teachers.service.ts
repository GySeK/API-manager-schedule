import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    return this.teacherRepository.save(this.teacherRepository.create(createTeacherDto));
  }

  async findAll() {
    return await this.teacherRepository.find();
  }

  async findOne(id: number) {
    return await this.teacherRepository.findOneBy( {id} )
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return await this.teacherRepository.update(id, updateTeacherDto)
  }

  async remove(id: number) {
    return await this.teacherRepository.delete(id);
  }
}
