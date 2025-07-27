import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NumerologyModule } from './numerology/numerology.module';

@Module({
  imports: [AuthModule, NumerologyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
