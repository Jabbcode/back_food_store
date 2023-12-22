import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './schemas/stores.schema';
import { Request } from 'express';
import { ProductsService } from '../products/products.service';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<Store>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const createdStore = new this.storeModel(createStoreDto);
    return createdStore.save();
  }

  async findAll(request: Request): Promise<Store[]> {
    return await this.storeModel
      .find(request.query)
      .populate({
        path: 'products',
        populate: { path: 'categories' },
      })
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<Store | null> {
    return await this.storeModel
      .findById(id)
      .populate({
        path: 'products',
        populate: { path: 'categories' },
      })
      .exec();
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

  async assignProductsToStore(storeId: string, productIds: string[]) {
    try {
      const store = await this.storeModel.findById(storeId).exec();

      if (!store) {
        throw new Error('No se encontró el almacén con el ID proporcionado');
      }

      const existingProductIds = store.products.map((product) =>
        product._id.toString(),
      );

      // Filtrar los IDs de productos que no están ya asignados al almacén
      const newProductIds = productIds?.filter(
        (productId) => !existingProductIds.includes(productId),
      );

      if (newProductIds.length === 0) {
        console.log('Todos los productos ya están asignados al almacén.');
        return store;
      }

      // Obtener información completa de los nuevos productos
      const newProducts = await Promise.all(
        newProductIds.map((productId) =>
          this.productsService.findOne(productId),
        ),
      );

      // Asignar los nuevos productos al almacén
      store.products = store.products.concat(newProducts);

      // Guardar el almacén actualizado
      await store.save();

      // Volver a obtener el almacén con los productos populados
      const updatedStore = await this.storeModel
        .findById(storeId)
        .populate('products')
        .exec();

      if (!updatedStore) {
        throw new Error('Error al obtener el almacén actualizado');
      }

      return updatedStore;
    } catch (error) {
      console.error(error);
      throw new Error('Error al asignar productos al almacén');
    }
  }
}
