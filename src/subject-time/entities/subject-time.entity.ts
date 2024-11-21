import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { TeacherSubject } from 'src/teacher-subject/entities/teacher-subject.entity';

@Entity()
export class SubjectTime {
  @ApiProperty()
  @PrimaryColumn()
  studyYear: number;

  @ApiProperty()
  @Column()
  subjectTime: number;

  @ApiProperty()
  @Column()
  teacherSubjectId: number;
  @ManyToOne(
    () => TeacherSubject,
    (teacherSubject: TeacherSubject) => teacherSubject.subjectsTime,
    {
      onDelete: 'CASCADE',
    },
  )
  teacherSubject: TeacherSubject;
}
