import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({
    example: 'Kg',
    description: 'Nombre de la unidad',
    required: true,
    format: 'string',
  })
  @IsString()
  readonly nombre: string;

  @ApiProperty({
    example: 'Empaque de 6 piezas',
    description:
      'Un campo para proporcionar una descripción más detallada de la unidad. Como su forma, color, o cualquier otro detalle relevante',
    required: true,
    format: 'string',
  })
  @IsString()
  readonly descripcion: string;

  @ApiProperty({
    example: 'true',
    description: ' Un campo que indica si la unidad está activa o no.',
    required: true,
    format: 'boolean',
  })
  @IsBoolean()
  readonly activa: boolean;
}
