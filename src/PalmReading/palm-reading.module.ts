import { Module } from '@nestjs/common';
import { PalmReadingController } from './palm-reading.controller';
import { PalmReadingService } from './palm-reading.service';

@Module({
  controllers: [PalmReadingController],
  providers: [PalmReadingService],
  exports: [PalmReadingService], // Export if you need to use this service in other modules
})
export class PalmReadingModule {}
