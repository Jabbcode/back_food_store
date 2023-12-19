import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Model } from 'mongoose';
import { Store } from './entities/store.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

  async create(createStoreDto: CreateStoreDto) {
    const createdStore = new this.storeModel(createStoreDto);
    return createdStore.save();
  }

  async findAll(): Promise<Store[]> {
    return await this.storeModel.find().exec();
  }

  async findOne(id: string): Promise<Store | null> {
    return await this.storeModel.findById(id).exec();
  }

  async update(
    id: string,
    updateStoreDto: UpdateStoreDto,
  ): Promise<Store | null> {
    return await this.storeModel
      .findByIdAndUpdate(id, updateStoreDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.storeModel.findByIdAndDelete(id).exec();
  }
}
