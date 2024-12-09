import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { ContaRepository } from './repositories/conta.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ContaService {
  constructor(private readonly contaRepository: ContaRepository) {}

  async create(createContaDto: CreateContaDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createContaDto.password,
      saltOrRounds,
    );

    return this.contaRepository.create({
      ...createContaDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.contaRepository.findAll();
  }

  findOne(id: number) {
    return this.contaRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.contaRepository.findByEmail(email);
  }

  update(id: number, updateContaDto: UpdateContaDto) {
    return this.contaRepository.update(id, updateContaDto);
  }

  remove(id: number) {
    return this.contaRepository.remove(id);
  }
}
