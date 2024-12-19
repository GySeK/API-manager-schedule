import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

import { Schedule } from './entities/schedule.entity';
import { ScheduleBlock } from './entities/scheduleBlock.entity';
import { ScheduleLesson } from './entities/scheduleLesson.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto, creatorLogin: string) {
    const schedule = new Schedule();
    schedule.scheduleBlocks = createScheduleDto.scheduleBlocks;
    schedule.creatorLogin = creatorLogin;
    schedule.creationDate = new Date();

    let result: {};
    await this.scheduleRepository.manager.transaction(async (manager) => {
      const scheduleResult = await manager.save(Schedule, schedule);
      
      for (let scheduleBlock of createScheduleDto.scheduleBlocks) {
        scheduleBlock.scheduleId = scheduleResult.id;

        const scheduleBlockResult = await manager.save(
          ScheduleBlock,
          scheduleBlock,
        );

        const scheduleLessons = scheduleBlockResult.scheduleLessons;
        for (let scheduleLesson of scheduleLessons) {
          scheduleLesson.scheduleBlockId = scheduleBlockResult.id;
        }

        await manager.save(
          ScheduleLesson,
          scheduleLessons,
        );

        result = scheduleResult;
      }
    });

    return result;
  }

  async findAll() {
    return await this.scheduleRepository.find({
      relations: ['scheduleBlocks', 'scheduleBlocks.scheduleLessons'],
      select: {
        id: true,
        creationDate: true,
        creatorLogin: true,
        scheduleBlocks: {
          groupId: true,
          scheduleDate: true,
          scheduleLessons: {
            id: true,
            cabinetId: true,
            lessonOrder: true,
            startLesson: true,
            endLesson: true,
            teacherSubjectId: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.scheduleRepository.findOne({
      where: { id },
      relations: ['scheduleBlocks', 'scheduleBlocks.scheduleLessons'],
      select: {
        id: true,
        creationDate: true,
        creatorLogin: true,
        scheduleBlocks: {

          groupId: true,
          scheduleDate: true,
          scheduleLessons: {
            id: true,
            cabinetId: true,
            lessonOrder: true,
            startLesson: true,
            endLesson: true,
            teacherSubjectId: true,
          },
        },
      },
    });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = new Schedule();
    schedule.scheduleBlocks = updateScheduleDto.scheduleBlocks;
    return await this.scheduleRepository.update(id, schedule);
  }

  async remove(id: number) {
    return await this.scheduleRepository.delete(id);
  }
}