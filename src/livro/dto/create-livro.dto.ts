import { IsNumber, IsString } from 'class-validator';

export class CreateLivroDto {
  @IsString()
  nome: string;

  @IsString()
  estiloNome: string;

  @IsString({ each: true })
  categorias: string[];

  @IsNumber()
  ambienteId: number;
}
