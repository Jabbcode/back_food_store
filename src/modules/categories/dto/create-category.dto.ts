import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty({
    example: 'Bebida',
    description: 'Categoria que se le asignara a un product',
    required: true,
    format: 'string',
  })
  @IsString()
  readonly nombre: string;
}
