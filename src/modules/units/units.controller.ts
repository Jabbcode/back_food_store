import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Unit } from './schemas/unit.schema';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';

@Controller('units')
@ApiTags('Units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  async create(@Body() createUnitDto: CreateUnitDto) {
    return await this.unitsService.create(createUnitDto);
  }

  @Get()
  async findAll(@Req() request: Request) {
    return await this.unitsService.findAll(request);
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.unitsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ): Promise<Unit> {
    return await this.unitsService.update(id, updateUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.unitsService.remove(id);
  }
}
