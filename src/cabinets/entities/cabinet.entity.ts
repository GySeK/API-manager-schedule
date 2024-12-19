import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduleBlock } from 'src/schedule/entities/scheduleBlock.entity';

@Entity()
export class Cabinet {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;
  
  @OneToMany(
      () => ScheduleBlock,
      (scheduleBlock: ScheduleBlock) => scheduleBlock.cabinet,
    )
    scheduleBlocks: ScheduleBlock[];
}