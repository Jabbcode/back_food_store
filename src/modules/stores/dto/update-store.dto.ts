import { IsArray, IsOptional, IsString } from 'class-validator';
import { Product } from 'src/modules/products/schemas/product.schema';

export class UpdateStoreDto {
  @IsString()
  @IsOptional()
  fechaModificacion: string;

  @IsArray()
  @IsOptional()
  products: Product[];
}
