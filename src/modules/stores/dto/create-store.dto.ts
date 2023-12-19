import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({
    example: '2023-12-05T00:00:00.000Z',
    description: 'Fecha de modificacion',
    required: true,
    format: 'date-time',
  })
  @IsString()
  readonly fechaModificacion: string;
}
