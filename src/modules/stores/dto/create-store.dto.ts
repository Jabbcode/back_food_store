import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({
    example: '2023-12-05T00:00:00.000Z',
    description: 'Fecha de modificacion',
    required: true,
    format: 'date-time',
  })
  @IsString()
  readonly fechaModificacion: string;

  @ApiProperty({
    example: ['id1', 'id2'], // Ejemplo de array de IDs
    description: 'Array de IDs de productos',
    required: true,
    isArray: true,
  })
  @IsArray()
  readonly products: string[];
}
