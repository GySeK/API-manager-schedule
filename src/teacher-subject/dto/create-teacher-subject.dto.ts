import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherSubjectDto {
    @ApiProperty()
    teacherId: number;
    @ApiProperty()
    subjectId: number;
}
