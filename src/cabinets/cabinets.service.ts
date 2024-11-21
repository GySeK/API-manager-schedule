import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';

import { Cabinet } from './entities/cabinet.entity';

@Injectable()
export class CabinetsService {
  constructor(
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>,
  ) {}

  async create(createCabinetDto: CreateCabinetDto) {
    return this.cabinetRepository.save(this.cabinetRepository.create(createCabinetDto));
  }

  async findAll() {
    return await this.cabinetRepository.find();
  }

  async findOne(id: number) {
    return await this.cabinetRepository.findOneBy( {id} )
  }

  async update(id: number, updateCabinetDto: UpdateCabinetDto) {
    return await this.cabinetRepository.update(id, updateCabinetDto)
  }

  async remove(id: number) {
    return await this.cabinetRepository.delete(id);
  }
}
