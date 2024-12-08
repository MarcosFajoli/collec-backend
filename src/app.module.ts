import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContaModule } from './conta/conta.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ContaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
