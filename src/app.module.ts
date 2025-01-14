import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContaModule } from './conta/conta.module';
import { AuthModule } from './auth/auth.module';
import { AmbienteModule } from './ambiente/ambiente.module';
import { LivroModule } from './livro/livro.module';
import { ColecaoModule } from './colecao/colecao.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ContaModule,
    AuthModule,
    AmbienteModule,
    LivroModule,
    ColecaoModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
