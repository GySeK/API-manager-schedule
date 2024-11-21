import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeacherSubjectService } from './teacher-subject.service';
import { TeacherSubjectController } from './teacher-subject.controller';
import { TeacherSubject } from './entities/teacher-subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherSubject])],
  controllers: [TeacherSubjectController],
  providers: [TeacherSubjectService],
})
export class TeacherSubjectModule {}
