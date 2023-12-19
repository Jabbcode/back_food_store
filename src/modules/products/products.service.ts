import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[] | null> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product | null> {
    return await this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    return await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
