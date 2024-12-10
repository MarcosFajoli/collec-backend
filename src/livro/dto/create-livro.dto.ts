import { IsString } from 'class-validator';

export class CreateLivroDto {
  @IsString()
  nome: string;

  @IsString()
  estilo: string;
}
