import { Injectable } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { LivroRepository } from './repositories/livro.repository';

@Injectable()
export class LivroService {
  constructor(private livroRepository: LivroRepository) {}

  create(createLivroDto: CreateLivroDto) {
    return this.livroRepository.create(createLivroDto);
  }

  findAll(ambienteId: number) {
    return this.livroRepository.findAll(ambienteId);
  }

  async findOne(id: number) {
    return this.livroRepository.findOne(id);
  }

  update(id: number, updateLivroDto: UpdateLivroDto) {
    return this.livroRepository.update(id, updateLivroDto);
  }

  remove(id: number) {
    return this.livroRepository.remove(id);
  }
}
