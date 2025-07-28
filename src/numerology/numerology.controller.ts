import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { NumerologyService } from './numerology.service';

@Controller('numerology')
export class NumerologyController {
  constructor(private readonly numerologyService: NumerologyService) {}

  @Get('daily')
  getDailyPrediction(@Query('dob') dob: string, @Query('date') date?: string) {
    if (!dob) {
      throw new BadRequestException('Date of birth (dob) is required');
    }
    return this.numerologyService.getDailyPrediction(dob, date);
  }

  @Get('monthly')
  getMonthlyOverview(
    @Query('dob') dob: string,
    @Query('month') month?: string,
  ) {
    if (!dob) throw new BadRequestException('Date of birth (dob) is required');
    return this.numerologyService.getMonthlyOverview(dob, month);
  }
}
