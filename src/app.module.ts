import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NumerologyModule } from './numerology/numerology.module';
import { PalmReadingModule } from './PalmReading/palm-reading.module';

@Module({
  imports: [AuthModule, NumerologyModule, PalmReadingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
