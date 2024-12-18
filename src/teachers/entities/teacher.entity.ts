import { ApiProperty } from '@nestjs/swagger';
import { TeacherSubject } from 'src/teacher-subject/entities/teacher-subject.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Teacher {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column({ nullable: true })
  middleName: string;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.teacher)
  teacherSubjects: TeacherSubject[]
}