import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Pan de molde',
    description: 'Nombre del producto',
    required: true,
    format: 'string',
  })
  @IsString()
  readonly nombre: string;

  @ApiProperty({
    example: 20,
    description: 'Cantidad del producto que se tiene disponible',
    required: true,
    format: 'number',
  })
  @IsNumber()
  readonly cantidad: number;

  @ApiProperty({
    example: '2023-10-15',
    description: 'Fecha en la que se compró el producto',
    required: true,
    format: 'string',
  })
  @IsString()
  readonly fecha: string;

  @ApiProperty({
    example: ['id1', 'id2'],
    description: 'Array de IDs de categorias',
    required: true,
    isArray: true,
  })
  @IsArray()
  readonly categories: string[];
}
