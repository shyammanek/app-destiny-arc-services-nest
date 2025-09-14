import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PalmReadingService, UserProfile } from './palm-reading.service';

@Controller('palm')
export class PalmReadingController {
  constructor(private readonly palmReadingService: PalmReadingService) {}

  @Post('analyze')
  async analyze(
    @Body('imageBase64') imageBase64: string,
    @Body('userProfile') userProfile: UserProfile,
  ) {
    if (!imageBase64) {
      throw new HttpException('Image data is missing', HttpStatus.BAD_REQUEST);
    }

    try {
      const reading = await this.palmReadingService.analyzePalmPhoto(imageBase64, userProfile || {});
      return { success: true, reading };
    } catch (error) {
      throw new HttpException(error.message || 'Analysis failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
