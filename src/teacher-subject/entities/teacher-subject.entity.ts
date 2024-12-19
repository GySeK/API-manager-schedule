import {
  Entity,
  Unique,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
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
  @ManyToOne(() => Teacher, (teacher) => teacher.teacherSubjects, {
    onDelete: 'CASCADE',
  })
  teacher: Teacher;

  @ApiProperty()
  @Column({ name: 'subjectId' })
  subjectId: number;
  @ManyToOne(() => Subject, (subject) => subject.teacherSubjects, {
    onDelete: 'CASCADE',
  })
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
  cabinet: any;
}
