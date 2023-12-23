import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { CategoriesService } from '../categories/categories.service';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(request: Request): Promise<Product[] | null> {
    return await this.productModel
      .find(request.query)
      .populate('categories')
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<Product | null> {
    return await this.productModel.findById(id).populate('categories').exec();
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
  async assignCategoryToProduct(productId: string, categoryIds: string[]) {
    try {
      const product = await this.productModel.findById(productId).exec();

      if (!product) {
        throw new Error('No se encontró el producto con el ID proporcionado');
      }

      const existingCategoryIds = product.categories.map((category) =>
        category._id.toString(),
      );

      const newCategoryIds = categoryIds?.filter(
        (categoryId) => !existingCategoryIds.includes(categoryId),
      );

      if (newCategoryIds.length === 0) {
        console.log('Todas las categorias ya están asignados al producto.');
        return product;
      }

      const newCategories = await Promise.all(
        newCategoryIds.map((categoryId) =>
          this.categoriesService.findOne(categoryId),
        ),
      );

      product.categories = product.categories.concat(newCategories);

      await product.save();

      // Volver a obtener el producto con las categorias populadas
      const updatedProduct = await this.productModel
        .findById(productId)
        .populate('categories')
        .exec();

      if (!updatedProduct) {
        throw new Error('Error al obtener el producto actualizado');
      }

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new Error('Error al asignar categorias al producto');
    }
  }

  async unassignCategoriesToProduct(productId: string, categoryIds: string[]) {
    try {
      const product = await this.productModel.findById(productId).exec();

      if (!product) {
        throw new Error('No se encontró el producto con el ID proporcionado');
      }

      const existingCategoryIds = product.categories.map((category) =>
        category._id.toString(),
      );

      // Filtrar los IDs de productos que están ya asignados al almacén
      const newCategoryIds = categoryIds?.filter((categoryId) =>
        existingCategoryIds.includes(categoryId),
      );

      if (!newCategoryIds || newCategoryIds.length === 0) {
        console.log('Ninguno de las categorias está asignada al producto.');
        return product;
      }

      // Eliminar las categorias del producto por sus IDs
      product.categories = product.categories.filter(
        (category) => !newCategoryIds.includes(category._id.toString()),
      );

      // Guardar el producto actualizado
      await product.save();

      // Volver a obtener el producto con las categorias populados
      const updatedProduct = await this.productModel
        .findById(productId)
        .populate('categories')
        .exec();

      if (!updatedProduct) {
        throw new Error('Error al obtener el producto actualizado');
      }

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new Error('Error al desasignar categorias al producto');
    }
  }
}
