import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ScheduleService } from './schedule.service';
import { UsersService } from 'src/users/users.service';

import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

import { Schedule } from './entities/schedule.entity'

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: Schedule })
  async create(@Request() req, @Body() createScheduleDto: CreateScheduleDto) {
    return await this.scheduleService.create(createScheduleDto, req.user.login);
  }

  @Get()
  @ApiOkResponse({ type: [Schedule] })
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Schedule })
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Schedule })
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Schedule })
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
