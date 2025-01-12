import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ColecaoService } from './colecao.service';
import { CreateColecaoDto } from './dto/create-colecao.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AmbienteGuard } from 'src/ambiente/guards/ambiente.guard';
import { UploadService } from 'src/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/upload/multer.config';

@Controller('colecao')
export class ColecaoController {
  constructor(
    private readonly colecaoService: ColecaoService,
    private readonly uploadService: UploadService,
  ) {}

  @UseGuards(AuthGuard, AmbienteGuard)
  @Post('/:ambienteId/:colecaoId/capa')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadCover(
    @Param('colecaoId') colecaoId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filePath = await this.uploadService.uploadFile(file, 'colecoes');
    const colecao = await this.colecaoService.addPhoto(colecaoId, filePath);
    return { message: 'Capa da coleção atualizada com sucesso!', colecao };
  }

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
