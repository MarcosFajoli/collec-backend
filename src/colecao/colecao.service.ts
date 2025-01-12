import { Injectable } from '@nestjs/common';
import { CreateColecaoDto } from './dto/create-colecao.dto';
import { ColecaoRepository } from './repositories/colecao.repository';

@Injectable()
export class ColecaoService {
  constructor(private colecaoRepository: ColecaoRepository) {}

  create(createColecaoDto: CreateColecaoDto) {
    return this.colecaoRepository.create(createColecaoDto);
  }

  addPhoto(id: number, filePath: string) {
    return this.colecaoRepository.addPhoto(id, filePath);
  }

  findAll(ambienteId: number) {
    return this.colecaoRepository.findAll(ambienteId);
  }

  findOne(id: number) {
    return this.colecaoRepository.findOne(id);
  }

  update(id: number, nome: string) {
    return this.colecaoRepository.update(id, nome);
  }

  vincularLivro(colecaoId: number, livroId: number) {
    return this.colecaoRepository.vincularLivro(livroId, colecaoId);
  }

  desvincularLivro(colecaoId: number, livroId: number) {
    return this.colecaoRepository.desvincularLivro(livroId, colecaoId);
  }

  remove(id: number) {
    return this.colecaoRepository.delete(id);
  }
}
