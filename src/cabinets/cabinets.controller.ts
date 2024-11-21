import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CabinetsService } from './cabinets.service';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';

import { Cabinet } from './entities/cabinet.entity';

@ApiTags('cabinets')
@Controller('cabinets')
export class CabinetsController {
  constructor(private readonly cabinetsService: CabinetsService) {}

  @Post()
  @ApiCreatedResponse({ type: Cabinet })
  create(@Body() createCabinetDto: CreateCabinetDto) {
    return this.cabinetsService.create(createCabinetDto);
  }

  @Get()
  @ApiOkResponse({ type: [Cabinet] })
  findAll() {
    return this.cabinetsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Cabinet })
  findOne(@Param('id') id: string) {
    return this.cabinetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Cabinet })
  update(@Param('id') id: string, @Body() updateCabinetDto: UpdateCabinetDto) {
    return this.cabinetsService.update(+id, updateCabinetDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Cabinet })
  remove(@Param('id') id: string) {
    return this.cabinetsService.remove(+id);
  }
}
