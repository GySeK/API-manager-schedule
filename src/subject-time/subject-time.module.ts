import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectTimeService } from './subject-time.service';
import { SubjectTimeController } from './subject-time.controller';

import { SubjectTime } from './entities/subject-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectTime])],
  controllers: [SubjectTimeController],
  providers: [SubjectTimeService],
})
export class SubjectTimeModule {}
