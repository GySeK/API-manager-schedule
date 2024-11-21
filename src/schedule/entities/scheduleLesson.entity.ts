import {
  Entity,
  Check,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { ScheduleBlock } from './scheduleBlock.entity';
import { TeacherSubject } from 'src/teacher-subject/entities/teacher-subject.entity';

@Entity()
@Check('"lessonOrder" > 0')
@Check('"lessonOrder" < 15')
export class ScheduleLesson {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @PrimaryColumn()
  lessonOrder: number;

  @ApiProperty()
  @Column({ type: 'time' })
  startLesson: Date;

  @ApiProperty()
  @Column({ type: 'time' })
  endLesson: Date;

  @ApiProperty()
  @Column({ name: 'teacherSubjectId' })
  teacherSubjectId: number;
  @ManyToOne(
    () => TeacherSubject,
    (teacherSubject: TeacherSubject) => teacherSubject.scheduleLessons,
    {
      onDelete: 'CASCADE',
    },
  )
  teacherSubject: TeacherSubject;

  @ApiProperty()
  @Column()
  scheduleBlockId: number;
  @ManyToOne(
    () => ScheduleBlock,
    (scheduleBlock: ScheduleBlock) => scheduleBlock.scheduleLessons,
    {
      onDelete: 'CASCADE',
    },
  )
  scheduleBlock: ScheduleBlock;
}