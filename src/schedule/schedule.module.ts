import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

import { Schedule } from './entities/schedule.entity';
import { ScheduleBlock } from './entities/scheduleBlock.entity';
import { ScheduleLesson } from './entities/scheduleLesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, ScheduleBlock, ScheduleLesson]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
