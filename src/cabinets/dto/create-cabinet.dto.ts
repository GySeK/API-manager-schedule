import { ApiProperty } from '@nestjs/swagger';

export class CreateCabinetDto {
    @ApiProperty()
    name: string;
}
