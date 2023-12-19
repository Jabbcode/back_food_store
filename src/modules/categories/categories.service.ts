import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[] | null> {
    return await this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category | null> {
    return await this.categoryModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    return await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id).exec();
  }
}
