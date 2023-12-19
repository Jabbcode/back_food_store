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
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './schemas/stores.schema';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('stores')
@ApiTags('Store')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  async findAll(@Req() request: Request) {
    return this.storesService.findAll(request);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Store | null> {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ): Promise<Store> {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.storesService.remove(id);
  }
}
