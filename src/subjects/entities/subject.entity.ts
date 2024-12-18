import { ApiProperty } from '@nestjs/swagger';
import { TeacherSubject } from 'src/teacher-subject/entities/teacher-subject.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Subject {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  complexity: number;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.subject)
  teacherSubjects: TeacherSubject[]
}