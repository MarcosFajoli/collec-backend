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

  findAll() {
    return `This action returns all livro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} livro`;
  }

  update(id: number, updateLivroDto: UpdateLivroDto) {
    return `This action updates a #${id} livro`;
  }

  remove(id: number) {
    return `This action removes a #${id} livro`;
  }
}
