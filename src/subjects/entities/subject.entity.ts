import { ApiProperty } from '@nestjs/swagger';
import { TeacherSubject } from 'src/teacher-subject/entities/teacher-subject.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => TeacherSubject, (teacherSubject) => teacherSubject.teachers)
  teacherSubject: TeacherSubject
}