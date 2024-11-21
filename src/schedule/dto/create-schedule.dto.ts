import { ApiProperty } from '@nestjs/swagger';
import { ScheduleBlock } from "../entities/scheduleBlock.entity"

export class CreateScheduleDto {
    @ApiProperty()
    scheduleBlocks : ScheduleBlock[];
}
