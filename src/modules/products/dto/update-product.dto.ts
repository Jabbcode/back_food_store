import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/modules/categories/schemas/category.schema';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsNumber()
  @IsOptional()
  cantidad: number;

  @IsString()
  @IsOptional()
  fecha: string;

  @IsArray()
  @IsOptional()
  categories: Category[];
}
