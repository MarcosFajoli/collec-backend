import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ColecaoService } from './colecao.service';
import { CreateColecaoDto } from './dto/create-colecao.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AmbienteGuard } from 'src/ambiente/guards/ambiente.guard';

@Controller('colecao')
export class ColecaoController {
  constructor(private readonly colecaoService: ColecaoService) {}

  @UseGuards(AuthGuard, AmbienteGuard)
  @Post()
  create(@Body() createColecaoDto: CreateColecaoDto) {
    return this.colecaoService.create(createColecaoDto);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Get('/:ambienteId')
  findAll(@Param('ambienteId') ambienteId: number) {
    return this.colecaoService.findAll(ambienteId);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Get('/:ambienteId/:id')
  findOne(@Param('id') id: number) {
    return this.colecaoService.findOne(id);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Patch('/:ambienteId/:id')
  update(@Param('id') id: number, @Body() body: { nome: string }) {
    return this.colecaoService.update(id, body.nome);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Post('/vincular/:ambienteId')
  vincularLivro(@Body() body: { colecaoId: number; livroId: number }) {
    return this.colecaoService.vincularLivro(body.colecaoId, body.livroId);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Post('/desvincular/:ambienteId')
  desvincularLivro(@Body() body: { colecaoId: number; livroId: number }) {
    return this.colecaoService.desvincularLivro(body.colecaoId, body.livroId);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Delete('/:ambienteId/:id')
  remove(@Param('id') id: string) {
    return this.colecaoService.remove(+id);
  }
}
