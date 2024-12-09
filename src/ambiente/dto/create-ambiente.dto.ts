import { IsString } from 'class-validator';

export class CreateAmbienteDto {
  @IsString()
  nome: string;
}
