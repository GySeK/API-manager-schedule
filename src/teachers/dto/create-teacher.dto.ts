import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty({ required: false, nullable: true })
    middleName: string;
}
