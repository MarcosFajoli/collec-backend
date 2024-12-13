import { IsNumber, IsString } from 'class-validator';

export class CreateColecaoDto {
  @IsNumber()
  ambienteId: number;

  @IsString()
  nome: string;
}
