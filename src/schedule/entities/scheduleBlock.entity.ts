import {
  Entity,
  Unique,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Schedule } from './schedule.entity';
import { Group } from 'src/groups/entities/group.entity';
import { ScheduleLesson } from './scheduleLesson.entity';
import { Cabinet } from 'src/cabinets/entities/cabinet.entity';

@Entity()
@Unique(['scheduleDate', 'groupId'])
export class ScheduleBlock {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  scheduleId: number;
  @ManyToOne(() => Schedule, (schedule: Schedule) => schedule.scheduleBlocks, {
    onDelete: 'CASCADE',
  })
  schedule: Schedule;

  @ApiProperty({ type: [ScheduleLesson] })
  @OneToMany(
    () => ScheduleLesson,
    (scheduleLesson: ScheduleLesson) => scheduleLesson.scheduleBlock,
  )
  scheduleLessons: ScheduleLesson[];

  @ApiProperty()
  @Column({ name: 'cabinetId' })
  cabinetId: number;
  @ManyToOne(
    () => Cabinet,
    (cabinet: Cabinet) => cabinet.scheduleBlocks,
  )
  cabinet: Cabinet;

  @ApiProperty()
  @Column({ name: 'groupId' })
  groupId: number;
  @ManyToOne(
    () => Group,
    (group: Group) => group.scheduleBlocks,
  )
  group: Group;

  @ApiProperty()
  @Column({ name: 'scheduleDate' })

  @ApiProperty()
  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  scheduleDate: Date;
}
