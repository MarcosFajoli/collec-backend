import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAmbienteDto } from './dto/create-ambiente.dto';
import { AmbienteService } from './ambiente.service';

@Controller('ambiente')
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAmbienteDto: CreateAmbienteDto, @Request() req) {
    const contaId = req.conta.id;
    return this.ambienteService.createAmbiente(createAmbienteDto.nome, contaId);
  }
}
