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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Req() request: Request): Promise<Product[] | null> {
    return this.productsService.findAll(request);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.productsService.remove(id);
  }

  @Post(':productId/categories/assign')
  async assignCategoryToProduct(
    @Param('productId') productId: string,
    @Body() categoryIds: string[],
  ) {
    try {
      const updateProduct = await this.productsService.assignCategoryToProduct(
        productId,
        categoryIds,
      );
      return { success: true, data: updateProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post(':productId/categories/unassign')
  async unassignCategoriesToProduct(
    @Param('productId') productId: string,
    @Body() categoryIds: string[],
  ) {
    try {
      const updatedProduct =
        await this.productsService.unassignCategoriesToProduct(
          productId,
          categoryIds,
        );
      return { success: true, data: updatedProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
