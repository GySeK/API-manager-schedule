import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guard';
import { TeachersModule } from './teachers/teachers.module';
import { CabinetsModule } from './cabinets/cabinets.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TeacherSubjectModule } from './teacher-subject/teacher-subject.module';
import { SubjectTimeModule } from './subject-time/subject-time.module';

import { GroupsModule } from './groups/groups.module';
import { SubjectTime } from './subject-time/entities/subject-time.entity';
import { Teacher } from './teachers/entities/teacher.entity';
import { User } from './users/entities/user.entity';
import { Subject } from './subjects/entities/subject.entity';
import { Cabinet } from './cabinets/entities/cabinet.entity';
import { Schedule } from './schedule/entities/schedule.entity';
import { ScheduleBlock } from './schedule/entities/scheduleBlock.entity';
import { Group } from './groups/entities/group.entity';
import { ScheduleLesson } from './schedule/entities/scheduleLesson.entity';
import { TeacherSubject } from './teacher-subject/entities/teacher-subject.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.development.local',
        '.env.development',
        '.env.local',
        '.env',
      ],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          Teacher,
          User,
          Subject,
          Cabinet,
          Schedule,
          ScheduleBlock,
          Group,
          ScheduleLesson,
          TeacherSubject,
          SubjectTime,
        ],
        synchronize:
          configService.get<string>('PRODUCTION') === 'TRUE' ? false : true,
      }),
    }),

    AuthModule,
    UsersModule,
    TeachersModule,
    CabinetsModule,
    SubjectsModule,
    ScheduleModule,
    TeacherSubjectModule,
    SubjectTimeModule,
    GroupsModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
