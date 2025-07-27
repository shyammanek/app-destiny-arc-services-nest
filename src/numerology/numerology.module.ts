import { Module } from '@nestjs/common';
import { NumerologyController } from './numerology.controller';
import { NumerologyService } from './numerology.service';

@Module({
  controllers: [NumerologyController],
  providers: [NumerologyService],
})
export class NumerologyModule {}
