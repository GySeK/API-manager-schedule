import {
  Entity,
  Unique,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { ScheduleLesson } from 'src/schedule/entities/scheduleLesson.entity';
import { SubjectTime } from 'src/subject-time/entities/subject-time.entity';

@Entity()
@Unique(['teacherId', 'subjectId'])
export class TeacherSubject {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'teacherId' })
  teacherId: number;
  @OneToOne(() => Teacher, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  teacher: Teacher;

  @ApiProperty()
  @Column({ name: 'subjectId' })
  subjectId: number;
  @OneToOne(() => Subject, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subject: Subject;

  @OneToMany(
    () => SubjectTime,
    (subjectTime: SubjectTime) => subjectTime.teacherSubject,
  )
  subjectsTime: SubjectTime[];

  @OneToMany(
    () => ScheduleLesson,
    (scheduleLesson: ScheduleLesson) => scheduleLesson.teacherSubject,
  )
  scheduleLessons: ScheduleLesson[];
}
