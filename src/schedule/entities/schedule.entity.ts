import { ApiProperty } from '@nestjs/swagger';
import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

import { ScheduleBlock } from './scheduleBlock.entity';

@Entity()
export class Schedule {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: [ScheduleBlock] })
  @OneToMany(() => ScheduleBlock, (scheduleBlock: ScheduleBlock) => scheduleBlock.schedule)
  scheduleBlocks : ScheduleBlock[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @ApiProperty()
  @Column()
  creatorLogin: string
}