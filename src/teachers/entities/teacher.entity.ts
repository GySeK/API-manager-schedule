import { ApiProperty } from '@nestjs/swagger';
import { TeacherSubject } from 'src/teacher-subject/entities/teacher-subject.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => TeacherSubject, (teacherSubject) => teacherSubject.teachers)
  teacherSubject: TeacherSubject
}