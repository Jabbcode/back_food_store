import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUnitDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  activa: boolean;
}
