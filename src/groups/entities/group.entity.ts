import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ScheduleBlock } from 'src/schedule/entities/scheduleBlock.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => ScheduleBlock,
    (scheduleBlock: ScheduleBlock) => scheduleBlock.group,
  )
  scheduleBlocks: ScheduleBlock[];
}