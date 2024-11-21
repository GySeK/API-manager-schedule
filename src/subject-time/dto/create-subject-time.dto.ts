import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectTimeDto {
    @ApiProperty()
    studyYear: number;
    @ApiProperty()
    subjectTime: number;
    @ApiProperty()
    teacherSubjectId: number;
}
