import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { Unit } from './schemas/unit.schema';

@Injectable()
export class UnitsService {
  constructor(@InjectModel(Unit.name) private unitModel: Model<Unit>) {}
  async create(createUnitDto: CreateUnitDto) {
    const createUnit = new this.unitModel(createUnitDto);
    return createUnit.save();
  }

  async findAll(request: Request): Promise<Unit[] | null> {
    return await this.unitModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<Unit> {
    return await this.unitModel.findById(id).exec();
  }

  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit | null> {
    return await this.unitModel
      .findByIdAndUpdate(id, updateUnitDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.unitModel.findByIdAndDelete(id).exec();
  }
}
