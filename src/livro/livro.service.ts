import { Injectable } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { LivroRepository } from './repositories/livro.repository';

@Injectable()
export class LivroService {
  constructor(private livroRepository: LivroRepository) {}

  async create(createLivroDto: CreateLivroDto) {
    return this.livroRepository.create(createLivroDto);
  }

  async findAll(ambienteId: number) {
    return this.livroRepository.findAll(ambienteId);
  }

  async findByCategoria(ambienteId: number, categoriaId: number) {
    return this.livroRepository.findByCategoria(ambienteId, categoriaId);
  }

  async findOne(id: number) {
    return this.livroRepository.findOne(id);
  }

  async update(id: number, updateLivroDto: UpdateLivroDto) {
    return this.livroRepository.update(id, updateLivroDto);
  }

  addPhoto(id: number, filePath: string) {
    return this.livroRepository.addPhoto(id, filePath);
  }

  async remove(id: number) {
    return this.livroRepository.remove(id);
  }
}
