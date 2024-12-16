import {
  Entity,
  Unique,
  Column,
  PrimaryGeneratedColumn,
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
  @OneToMany(() => Teacher, (teacher) => teacher.teacherSubject, {
    onDelete: 'CASCADE',
  })
  teachers: Teacher[];

  @ApiProperty()
  @Column({ name: 'subjectId' })
  subjectId: number;
  @OneToMany(() => Subject, (subject) => subject.teacherSubject, {
    onDelete: 'CASCADE',
  })
  teacherSubject: TeacherSubject;

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
