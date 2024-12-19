import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduleLesson } from 'src/schedule/entities/scheduleLesson.entity';

@Entity()
export class Cabinet {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;
  
  @OneToMany(
      () => ScheduleLesson,
      (scheduleLesson: ScheduleLesson) => scheduleLesson.cabinet,
    )
  scheduleLessons: ScheduleLesson[];
}